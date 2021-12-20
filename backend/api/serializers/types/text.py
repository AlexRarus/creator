from api.models.types.text import Text
from rest_framework import serializers


class BlockTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = Text
        fields = ("text",)


def block_text_create(data):
    serializer = BlockTextSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    return serializer.save()


def block_text_update(text_instance, data):
    serializer = BlockTextSerializer(text_instance, data=data, partial=True)
    serializer.is_valid(raise_exception=True)

    return serializer.save()
