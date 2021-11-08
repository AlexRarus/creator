from api.models.block import Block
from api.models.types.text import Text
from api.serializers.types.text import TypeTextSerializer
from rest_framework import serializers


class BlockSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    data = serializers.SerializerMethodField(read_only=True)

    def get_data(self, obj):
        if obj.type == "text":
            return TypeTextSerializer(obj.text).data

    def create(self, validated_data):
        data = self.initial_data.pop("data")
        block = Block.objects.create(**validated_data)

        if validated_data.get("type") == "text":
            block.text = Text.objects.create(text=data)

        block.save()
        return block

    def update(self, block, validated_data):
        data = self.initial_data.pop("data")

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
        )  # динамический набор полей
