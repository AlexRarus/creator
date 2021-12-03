from api.models.types.text import Text
from rest_framework import serializers


class TypeTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = Text
        fields = ("text",)


def block_text_update(text_obj, data):
    text_obj.text = data.get("text", text_obj.text)
    text_obj.save()
