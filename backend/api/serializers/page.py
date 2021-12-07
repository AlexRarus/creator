from api.models.block import Block
from api.models.page import Page
from api.models.relations import PageBlockRelation, SectionBlockRelation
from django.db.models import Prefetch
from rest_framework import serializers

from .block import BlockSerializerRead


class PageWriteSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    blocks = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Block.objects.all()
    )

    def create(self, validated_data):
        blocks = validated_data.pop("blocks")
        page = Page.objects.create(**validated_data)

        for order, block in enumerate(blocks):
            PageBlockRelation.objects.update_or_create(
                page=page,
                block=block,
                order=order,
            )

        #  открепляем блоки от секций
        SectionBlockRelation.objects.filter(block__in=blocks).delete()

        return page

    def update(self, page, validated_data):
        blocks = validated_data.pop("blocks", None)

        page.slug = validated_data.get("slug", page.slug)
        page.label = validated_data.get("label", page.label)
        page.save()

        if blocks is not None:
            for order, block in enumerate(blocks):
                PageBlockRelation.objects.update_or_create(
                    page=page,
                    block=block,
                    order=order,
                )

            #  открепляем блоки от секций
            SectionBlockRelation.objects.filter(block__in=blocks).delete()

        # для того чтобы возвращалась нужная сортировка
        return Page.objects.prefetch_related(
            Prefetch(
                "blocks",
                queryset=Block.objects.order_by("pageblockrelation__order"),
            ),
        ).get(id=page.id)

    class Meta:
        model = Page
        fields = (
            "id",
            "author",
            "blocks",
            "slug",
            "label",
        )


class PageReadSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    blocks = BlockSerializerRead(read_only=True, many=True)

    class Meta:
        model = Page
        fields = (
            "id",
            "author",
            "blocks",
            "slug",
            "label",
        )
