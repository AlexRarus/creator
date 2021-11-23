from api.models.block import Block
from api.models.page import Page
from api.models.relations import PageBlockRelation
from django.db.models import Prefetch
from rest_framework import serializers

from .block import BlockReadSerializer


class PageWriteSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    blocks = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Block.objects.all()
    )

    def create(self, validated_data):
        blocks = validated_data.pop("blocks")
        print(validated_data)
        page = Page.objects.create(**validated_data)

        for order, block in enumerate(blocks):
            PageBlockRelation.objects.update_or_create(
                page=page,
                block=block,
                order=order,
            )
        return page

    def update(self, page, validated_data):
        blocks = validated_data.pop("blocks")

        page.slug = validated_data.get("slug", page.slug)
        page.label = validated_data.get("label", page.label)
        page.save()

        for order, block in enumerate(blocks):
            PageBlockRelation.objects.update_or_create(
                page=page,
                block=block,
                order=order,
            )

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
    blocks = BlockReadSerializer(read_only=True, many=True)

    class Meta:
        model = Page
        fields = (
            "id",
            "author",
            "blocks",
            "slug",
            "label",
        )
