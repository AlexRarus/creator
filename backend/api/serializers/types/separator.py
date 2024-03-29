from api.models.image import Image
from api.models.types.separator import Separator
from rest_framework import serializers

from ..image import ImageSerializer


class BlockSeparatorSerializerRead(serializers.ModelSerializer):
    icon = ImageSerializer()

    class Meta:
        model = Separator
        fields = "__all__"


class BlockSeparatorSerializerWrite(serializers.ModelSerializer):
    icon = serializers.PrimaryKeyRelatedField(
        allow_null=True, required=False, queryset=Image.objects.all()
    )

    class Meta:
        model = Separator
        fields = "__all__"


def block_separator_create(data):
    serializer = BlockSeparatorSerializerWrite(data=data)
    serializer.is_valid(raise_exception=True)
    return serializer.save()


def block_separator_update(separator_instance, data):
    serializer = BlockSeparatorSerializerWrite(
        separator_instance, data=data, partial=True
    )
    serializer.is_valid(raise_exception=True)

    return serializer.save()


def block_separator_clone(block_instance):
    block_instance_separator = block_instance.separator
    # todo клонируем содержимое блока
    block_instance_separator.pk = None
    block_instance_separator.save()
    # todo клонируем блок
    block_instance.pk = None
    block_instance.separator = block_instance_separator
    block_instance.save()

    return block_instance
