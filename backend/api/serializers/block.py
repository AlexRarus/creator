from api.models.block import Block
from api.models.relations import PageBlockRelation
from api.models.types.button import Button, ButtonType
from api.models.types.text import Text
from api.serializers.types.button import (
    ButtonSerializerRead,
    block_button_update,
)
from api.serializers.types.text import TypeTextSerializer, block_text_update
from django.db.models import Prefetch
from rest_framework import serializers
from rest_framework.exceptions import ValidationError


class UnknowTypeError(Exception):
    pass


class BlockSerializerRead(serializers.ModelSerializer):
    type = serializers.CharField(read_only=True, source="type.slug")
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    data = serializers.SerializerMethodField(read_only=True)
    # page_slugs = serializers.SlugRelatedField(
    #     source="pages",
    #     slug_field="slug",
    #     read_only=True,
    #     many=True,
    # )

    def get_data(self, obj):
        if obj.type.slug == "text":
            return TypeTextSerializer(obj.text).data
        if obj.type.slug == "button":
            return ButtonSerializerRead(obj.button).data
        if obj.type.slug == "section":
            from api.serializers.types.section import SectionSerializerRead

            return SectionSerializerRead(obj.section).data

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

    def get_data(self, block):
        # так как это сериализатор Write то этот метод будет вызываться
        # в ответ на создание или обновление
        if block.type.slug == "text":
            return TypeTextSerializer(block.text).data
        if block.type.slug == "button":
            return ButtonSerializerRead(block.button).data
        if block.type.slug == "section":
            from api.serializers.types.section import SectionSerializerRead

            return SectionSerializerRead(block.section).data

    def create(self, validated_data):
        page = validated_data.pop("page", None)

        data = self.initial_data.pop("data")
        order = self.initial_data.pop("index", page.blocks.count())  # от 0

        block = Block.objects.create(**validated_data)

        try:
            if block.type.slug == "text":
                block.text = Text.objects.create(**data)
            elif block.type.slug == "button":
                button_type_slug = data.pop("type")
                button_type = ButtonType.objects.get(slug=button_type_slug)
                block.button = Button.objects.create(**data, type=button_type)
            elif block.type.slug == "section":
                from api.serializers.types.section import create_section

                block.section = create_section(data)
            else:
                raise UnknowTypeError

            block.save()

            # устанавливаем блок в нужную позицию (order)
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

        except UnknowTypeError:
            raise ValidationError({"error": ["неизвестный тип блока"]})
        except Exception as err:
            block.delete()
            raise err
            # raise ValidationError({"error": ["блок не создан"]})

        # для того чтобы возвращалась нужная сортировка
        return Block.objects.prefetch_related(
            Prefetch(
                "section__blocks",
                queryset=Block.objects.order_by("sectionblockrelation__order"),
            ),
        ).get(id=block.id)

    def update(self, block, validated_data):
        data = self.initial_data.pop("data")

        block.section = validated_data.get("section", block.section)

        if block.type.slug == "text":
            block_text_update(block.text, data)
        if block.type.slug == "button":
            block_button_update(block.button, data)
        if block.type.slug == "section":
            from api.serializers.types.section import update_section

            update_section(block.section, data)

        # для того чтобы возвращалась нужная сортировка
        return Block.objects.prefetch_related(
            Prefetch(
                "section__blocks",
                queryset=Block.objects.order_by("sectionblockrelation__order"),
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
        )  # динамический набор полей в поле data
