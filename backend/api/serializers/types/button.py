from api.models.image import Image
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
        fields = "__all__"


class BlockButtonSerializerWrite(serializers.ModelSerializer):
    type = serializers.SlugRelatedField(
        slug_field="slug", queryset=ButtonType.objects.all()
    )
    icon = serializers.PrimaryKeyRelatedField(
        allow_null=True, required=False, queryset=Image.objects.all()
    )

    class Meta:
        model = Button
        fields = "__all__"


def block_button_create(data):
    serializer = BlockButtonSerializerWrite(data=data)
    serializer.is_valid(raise_exception=True)
    return serializer.save()


def block_button_update(button_instance, data):
    serializer = BlockButtonSerializerWrite(
        button_instance, data=data, partial=True
    )
    serializer.is_valid(raise_exception=True)

    return serializer.save()


def block_button_clone(block_instance):
    block_instance_button = block_instance.button
    # todo клонируем содержимое блока
    block_instance_button.pk = None
    block_instance_button.save()
    # todo клонируем блок
    block_instance.pk = None
    block_instance.button = block_instance_button
    block_instance.save()

    return block_instance
