from api.models.section import DroppableSection
from rest_framework import serializers


class SectionSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = DroppableSection
        fields = (
            "id",
            "author",
            "name",
        )
