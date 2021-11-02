from rest_framework import serializers
from api.models.types.text import Text


class TypeTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = Text
        fields = ('id', 'text',)
