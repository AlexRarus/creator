from api.models.types.text import Text
from rest_framework import serializers


class TypeTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = Text
        fields = (
            "id",
            "text",
        )
