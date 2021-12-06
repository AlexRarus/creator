from api.models.types.button import Button, ButtonType
from rest_framework import serializers


class ButtonTypeSerializerRead(serializers.ModelSerializer):
    pricingPlan = serializers.CharField(
        read_only=True, source="pricingPlan.slug"
    )

    class Meta:
        model = ButtonType
        fields = (
            "slug",
            "pricingPlan",
        )


class ButtonSerializerRead(serializers.ModelSerializer):
    type = serializers.CharField(read_only=True, source="type.slug")

    class Meta:
        model = Button
        fields = (
            "label",
            "description",
            "type",
            "value",
        )


class ButtonSerializerWrite(serializers.ModelSerializer):
    type = serializers.PrimaryKeyRelatedField(
        queryset=ButtonType.objects.all()
    )

    class Meta:
        model = Button
        fields = (
            "label",
            "description",
            "type",
            "value",
        )


def block_button_update(button, data):
    button.label = data.get("label", button.label)
    button.description = data.get("description", button.description)
    button.value = data.get("value", button.value)
    # в type кнопки придет slug а нужен pk
    if data.get("type") is not None:
        button.type = ButtonType.objects.get(slug=data.get("type"))
    button.save()
