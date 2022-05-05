from api.models.block import Block
from api.models.relations import SectionBlockRelation, TemplateBlockRelation
from api.models.template import Template
from api.models.types.collapsed_list import CollapsedListItemBlock
from api.models.types.list import ListItemBlock
from django.contrib.auth import get_user_model
from django.db.models import Prefetch
from rest_framework import serializers

from .block import BlockSerializerRead
from .theme import ThemeSerializerRead

User = get_user_model()


class TemplateWriteSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    theme = serializers.PrimaryKeyRelatedField(read_only=True)
    blocks = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Block.objects.all()
    )

    def create(self, validated_data):
        blocks = validated_data.pop("blocks")
        template = Template.objects.create(**validated_data)

        for order, block in enumerate(blocks):
            TemplateBlockRelation.objects.update_or_create(
                template=template,
                block=block,
                order=order,
            )

        #  открепляем блоки от секций
        SectionBlockRelation.objects.filter(block__in=blocks).delete()

        return template

    def update(self, template, validated_data):
        blocks = validated_data.pop("blocks", None)

        template.slug = validated_data.get("slug", template.slug)
        template.label = validated_data.get("label", template.label)
        template.save()

        if blocks is not None:
            template.blocks.clear()  # очищаем блоки
            for order, block in enumerate(blocks):
                TemplateBlockRelation.objects.update_or_create(
                    template=template,
                    block=block,
                    order=order,
                )

            #  открепляем блоки от секций
            SectionBlockRelation.objects.filter(block__in=blocks).delete()

        # для того чтобы возвращалась нужная сортировка
        return Template.objects.prefetch_related(
            Prefetch(
                "blocks",
                queryset=Block.objects.order_by(
                    "templateblockrelation__order"
                ),
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
        ).get(id=template.id)

    class Meta:
        model = Template
        fields = (
            "id",
            "author",
            "theme",
            "blocks",
            "slug",
            "label",
        )


class TemplateReadSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    theme = ThemeSerializerRead(read_only=True)
    blocks = BlockSerializerRead(read_only=True, many=True)

    class Meta:
        model = Template
        fields = (
            "id",
            "author",
            "theme",
            "blocks",
            "slug",
            "label",
        )
