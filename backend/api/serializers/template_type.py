from api.models.template import TemplateType
from rest_framework import serializers


class TemplateTypeSerializer(serializers.ModelSerializer):
    pricingPlan = serializers.CharField(
        read_only=True, source="pricingPlan.slug"
    )

    class Meta:
        model = TemplateType
        fields = (
            "id",
            "slug",
            "pricingPlan",
        )
