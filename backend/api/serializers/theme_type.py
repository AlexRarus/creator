from api.models.theme import ThemeType
from rest_framework import serializers


class ThemeTypeSerializer(serializers.ModelSerializer):
    pricingPlan = serializers.CharField(
        read_only=True, source="pricingPlan.slug"
    )

    class Meta:
        model = ThemeType
        fields = (
            "id",
            "slug",
            "pricingPlan",
        )
