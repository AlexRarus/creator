from api.models.block_type import BlockType
from rest_framework import serializers


class BlockTypeSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    pricingPlan = serializers.CharField(
        read_only=True, source="pricingPlan.slug"
    )

    class Meta:
        model = BlockType
        fields = (
            "id",
            "author",
            "slug",
            "label",
            "pricingPlan",
        )
