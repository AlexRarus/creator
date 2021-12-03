from api.models.block import Block
from api.models.relations import PageBlockRelation
from api.models.types.button import Button, ButtonType
from api.models.types.text import Text
from api.serializers.types.button import (
    ButtonSerializerRead,
    block_button_update,
)
from api.serializers.types.text import TypeTextSerializer, block_text_update
from rest_framework import serializers


class BlockReadSerializer(serializers.ModelSerializer):
    type = serializers.CharField(read_only=True, source="type.slug")
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    data = serializers.SerializerMethodField(read_only=True)
    page_slugs = serializers.SlugRelatedField(
        source="pages",
        slug_field="slug",
        read_only=True,
        many=True,
    )

    def get_data(self, obj):
        if obj.type.slug == "text":
            return TypeTextSerializer(obj.text).data
        if obj.type.slug == "button":
            return ButtonSerializerRead(obj.button).data

    class Meta:
        model = Block
        fields = (
            "id",
            "author",
            "type",
            "section",
            "data",
            "page_slugs",
        )  # динамический набор полей


class BlockWriteSerializer(serializers.ModelSerializer):
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

    def create(self, validated_data):
        page = validated_data.pop("page")
        data = self.initial_data.pop("data")
        block = Block.objects.create(**validated_data)

        if block.type.slug == "text":
            block.text = Text.objects.create(**data)
        if block.type.slug == "button":
            button_type_slug = data.pop("type")
            button_type = ButtonType.objects.get(slug=button_type_slug)
            block.button = Button.objects.create(**data, type=button_type)

        PageBlockRelation.objects.create(
            page=page,
            block=block,
            order=page.blocks.count(),
        )
        block.save()

        return block

    def update(self, block, validated_data):
        data = self.initial_data.pop("data")

        block.section = validated_data.get("section", block.section)

        if block.type.slug == "text":
            block_text_update(block.text, data)
        if block.type.slug == "button":
            block_button_update(block.button, data)

        return block

    class Meta:
        model = Block
        fields = (
            "id",
            "author",
            "type",
            "section",
            "data",
            "page",
        )  # динамический набор полей в поле data
