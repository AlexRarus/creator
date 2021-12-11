from api.models.types.text import Text
from rest_framework import serializers


class BlockTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = Text
        fields = ("text",)


def block_text_create(data):
    return Text.objects.create(**data)


def block_text_update(text_instance, data):
    # обновляем только те свойства которые пришли
    for attr, value in data.items():
        setattr(text_instance, attr, value)

    text_instance.save()
