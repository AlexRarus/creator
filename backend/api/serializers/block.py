from api.models.block import Block
from api.models.relations import PageBlockRelation, TemplateBlockRelation
from api.models.types.collapsed_list import CollapsedListItemBlock
from api.models.types.list import ListItemBlock
from api.serializers.avatar import AvatarSerializer
from api.serializers.types.avatar import (
    BlockAvatarSerializer,
    block_avatar_create,
    block_avatar_update,
)
from api.serializers.types.button import (
    BlockButtonSerializerRead,
    block_button_create,
    block_button_update,
)
from api.serializers.types.collapsed_list import (
    BlockCollapsedListSerializer,
    block_collapsed_list_create,
    block_collapsed_list_update,
)
from api.serializers.types.list import (
    BlockListSerializer,
    block_list_create,
    block_list_update,
)
from api.serializers.types.separator import (
    BlockSeparatorSerializerRead,
    block_separator_create,
    block_separator_update,
)
from api.serializers.types.text import (
    BlockTextSerializer,
    block_text_create,
    block_text_update,
)
from django.contrib.auth import get_user_model
from django.db.models import Prefetch
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

User = get_user_model()


class UnknowTypeError(Exception):
    pass


class BlockAuthorSerializerRead(serializers.ModelSerializer):
    avatar = AvatarSerializer(read_only=True)

    class Meta:
        fields = ("avatar",)
        model = User


class BlockSerializerRead(serializers.ModelSerializer):
    type = serializers.CharField(read_only=True, source="type.slug")
    author = BlockAuthorSerializerRead(read_only=True)
    data = serializers.SerializerMethodField(read_only=True)

    def get_data(self, block):
        if block.type.slug == "text":
            return BlockTextSerializer(block.text).data
        if block.type.slug == "button":
            return BlockButtonSerializerRead(block.button).data
        if block.type.slug == "section":
            from api.serializers.types.section import (
                BlockSectionSerializerRead,
            )

            return BlockSectionSerializerRead(block.section).data
        if block.type.slug == "avatar":
            return BlockAvatarSerializer(block.avatar).data
        if block.type.slug == "list":
            return BlockListSerializer(block.list).data
        if block.type.slug == "collapsed_list":
            return BlockCollapsedListSerializer(block.collapsed_list).data
        if block.type.slug == "separator":
            return BlockSeparatorSerializerRead(block.separator).data

    class Meta:
        model = Block
        fields = (
            "id",
            "author",
            "type",
            "data",
            # "page_slugs",
        )  # динамический набор полей


class BlockSerializerWrite(serializers.ModelSerializer):
    type = serializers.CharField(read_only=True, source="type.slug")
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    data = serializers.SerializerMethodField(read_only=True)
    page = serializers.PrimaryKeyRelatedField(read_only=True)
    template = serializers.PrimaryKeyRelatedField(read_only=True)

    def get_data(self, block):
        # так как это сериализатор Write то этот метод будет вызываться
        # в ответ на создание или обновление
        if block.type.slug == "text":
            return BlockTextSerializer(block.text).data
        if block.type.slug == "button":
            return BlockButtonSerializerRead(block.button).data
        if block.type.slug == "section":
            from api.serializers.types.section import (
                BlockSectionSerializerRead,
            )

            return BlockSectionSerializerRead(block.section).data
        if block.type.slug == "avatar":
            return BlockAvatarSerializer(block.avatar).data
        if block.type.slug == "list":
            return BlockListSerializer(block.list).data
        if block.type.slug == "collapsed_list":
            return BlockCollapsedListSerializer(block.collapsed_list).data
        if block.type.slug == "separator":
            return BlockSeparatorSerializerRead(block.separator).data

    def create(self, validated_data):
        page = validated_data.pop("page", None)
        template = validated_data.pop("template", None)

        data = self.initial_data.pop("data")

        if page:
            order = self.initial_data.pop("index", page.blocks.count())  # от 0
        elif template:
            order = self.initial_data.pop(
                "index", template.blocks.count()
            )  # от 0
        else:
            order = 0

        block = Block.objects.create(**validated_data)

        try:
            if block.type.slug == "text":
                block.text = block_text_create(data)
            elif block.type.slug == "button":
                block.button = block_button_create(data)
            elif block.type.slug == "section":
                from api.serializers.types.section import block_section_create

                block.section = block_section_create(data)
            elif block.type.slug == "avatar":
                block.avatar = block_avatar_create(data)
            elif block.type.slug == "list":
                block.list = block_list_create(data)
            elif block.type.slug == "collapsed_list":
                block.collapsed_list = block_collapsed_list_create(data)
            elif block.type.slug == "separator":
                block.separator = block_separator_create(data)
            else:
                raise UnknowTypeError

            block.save()

            # устанавливаем блок в нужную позицию (order)
            if page:
                # todo если блок создавался для страницы
                page_blocks_list = list(
                    page.blocks.order_by("pageblockrelation__order").all()
                )  # create list
                page_blocks_list.insert(order, block)
                page.blocks.clear()  # открепляем все блоки от страницы
                for order, item in enumerate(page_blocks_list):
                    PageBlockRelation.objects.update_or_create(
                        page=page,
                        block=item,
                        order=order,
                    )
            elif template:
                # todo если блок создавался для шаблона
                template_blocks_list = list(
                    template.blocks.order_by(
                        "templateblockrelation__order"
                    ).all()
                )  # create list
                template_blocks_list.insert(order, block)
                template.blocks.clear()  # открепляем все блоки от страницы
                for order, item in enumerate(template_blocks_list):
                    TemplateBlockRelation.objects.update_or_create(
                        template=template,
                        block=item,
                        order=order,
                    )

        except UnknowTypeError:
            raise ValidationError({"error": ["неизвестный тип блока"]})
        except Exception as err:
            block.delete()
            raise err

        # для того чтобы возвращалась нужная сортировка
        return Block.objects.prefetch_related(
            Prefetch(
                "section__blocks",
                queryset=Block.objects.order_by("sectionblockrelation__order"),
            ),
            Prefetch(
                "list__items",
                queryset=ListItemBlock.objects.order_by(
                    "listitemblockrelation__order"
                ),
            ),
            Prefetch(
                "collapsed_list__items",
                queryset=CollapsedListItemBlock.objects.order_by(
                    "collapsedlistitemblockrelation__order"
                ),
            ),
        ).get(id=block.id)

    def update(self, block, validated_data):
        data = self.initial_data.pop("data")

        block.section = validated_data.get("section", block.section)

        if block.type.slug == "text":
            block_text_update(block.text, data)
        elif block.type.slug == "button":
            block_button_update(block.button, data)
        elif block.type.slug == "section":
            from api.serializers.types.section import block_section_update

            block_section_update(block.section, data)
        elif block.type.slug == "avatar":
            block_avatar_update(block.avatar, data)
        elif block.type.slug == "list":
            block_list_update(block.list, data)
        elif block.type.slug == "collapsed_list":
            block_collapsed_list_update(block.collapsed_list, data)
        elif block.type.slug == "separator":
            block_separator_update(block.separator, data)
        else:
            raise UnknowTypeError

        # для того чтобы возвращалась нужная сортировка
        return Block.objects.prefetch_related(
            Prefetch(
                "section__blocks",
                queryset=Block.objects.order_by("sectionblockrelation__order"),
            ),
            Prefetch(
                "list__items",
                queryset=ListItemBlock.objects.order_by(
                    "listitemblockrelation__order"
                ),
            ),
            Prefetch(
                "collapsed_list__items",
                queryset=CollapsedListItemBlock.objects.order_by(
                    "collapsedlistitemblockrelation__order"
                ),
            ),
        ).get(id=block.id)

    class Meta:
        model = Block
        fields = (
            "id",
            "author",
            "type",
            "data",
            "page",
            "template",
        )  # динамический набор полей в поле data
