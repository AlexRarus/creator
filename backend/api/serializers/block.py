from api.models.block import Block
from api.models.relations import PageBlockRelation
from api.models.types.text import Text
from api.serializers.types.text import TypeTextSerializer
from rest_framework import serializers


class BlockReadSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    data = serializers.SerializerMethodField(read_only=True)
    page_slugs = serializers.SlugRelatedField(
        source="pages",
        slug_field="slug",
        read_only=True,
        many=True,
    )

    def get_data(self, obj):
        if obj.type == "text":
            return TypeTextSerializer(obj.text).data

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
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    data = serializers.SerializerMethodField(read_only=True)
    page = serializers.PrimaryKeyRelatedField(read_only=True)

    def get_data(self, obj):
        if obj.type == "text":
            return TypeTextSerializer(obj.text).data

    def create(self, validated_data):
        page = validated_data.pop("page")
        data = self.initial_data.pop("data")
        block = Block.objects.create(**validated_data)

        if validated_data.get("type") == "text":
            block.text = Text.objects.create(**data)

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

        if validated_data.get("type") == "text":
            block.text.text = data.get("text", block.text.text)
            block.text.save()

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
