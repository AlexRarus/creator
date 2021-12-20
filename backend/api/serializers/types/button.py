from api.models.types.button import Button, ButtonType
from rest_framework import serializers

from ..image import ImageSerializer


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


class BlockButtonSerializerRead(serializers.ModelSerializer):
    type = serializers.CharField(read_only=True, source="type.slug")
    icon = ImageSerializer()

    class Meta:
        model = Button
        fields = (
            "label",
            "description",
            "kind",
            "type",
            "value",
            "icon",
        )


def block_button_create(data):
    button_type_slug = data.pop("type")
    button_type = ButtonType.objects.get(slug=button_type_slug)
    return Button.objects.create(**data, type=button_type)


def block_button_update(button_instance, data):
    # обновляем только те свойства которые пришли
    for attr, value in data.items():
        setattr(button_instance, attr, value)

    # в type кнопки придет slug а нужен pk
    if data.get("type") is not None:
        button_instance.type = ButtonType.objects.get(slug=data.get("type"))

    button_instance.save()
