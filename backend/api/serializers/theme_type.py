from api.models.block_type import BlockType
from rest_framework import serializers


class ThemeTypeSerializer(serializers.ModelSerializer):
    pricingPlan = serializers.CharField(
        read_only=True, source="pricingPlan.slug"
    )

    class Meta:
        model = BlockType
        fields = (
            "id",
            "slug",
            "pricingPlan",
        )
