from api.models.section import Section
from rest_framework import serializers


class SectionSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Section
        fields = (
            "id",
            "author",
            "name",
        )
