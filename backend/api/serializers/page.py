from api.models.block import Block
from api.models.page import Page
from api.models.relations import PageBlockRelation, SectionBlockRelation
from api.models.types.collapsed_list import CollapsedListItemBlock
from api.models.types.list import ListItemBlock
from django.contrib.auth import get_user_model
from django.db.models import Prefetch
from rest_framework import serializers

from .block import BlockSerializerRead
from .theme import ThemeSerializerRead

User = get_user_model()


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
        page.title = validated_data.get("title", page.title)
        page.description = validated_data.get("description", page.description)
        page.save()

        if blocks is not None:
            page.blocks.clear()  # очищаем блоки
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
            Prefetch(
                "blocks__section__blocks",
                queryset=Block.objects.order_by("sectionblockrelation__order"),
            ),
            Prefetch(
                "blocks__list__items",
                queryset=ListItemBlock.objects.order_by(
                    "listitemblockrelation__order"
                ),
            ),
            Prefetch(
                "blocks__collapsed_list__items",
                queryset=CollapsedListItemBlock.objects.order_by(
                    "collapsedlistitemblockrelation__order"
                ),
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
            "title",
            "description",
        )


class PageAuthorSerializer(serializers.ModelSerializer):
    theme = ThemeSerializerRead(read_only=True)

    class Meta:
        model = User
        fields = ("theme",)


class PageReadSerializer(serializers.ModelSerializer):
    author = PageAuthorSerializer(read_only=True)
    blocks = BlockSerializerRead(read_only=True, many=True)

    class Meta:
        model = Page
        fields = (
            "id",
            "author",
            "blocks",
            "slug",
            "label",
            "title",
            "description",
        )
