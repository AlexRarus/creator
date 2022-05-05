from api.models.image import Image
from api.models.types.list import (
    ListBlock,
    ListItemBlock,
    ListItemBlockRelation,
)
from rest_framework import serializers

from ..image import ImageSerializer


class ListItemBlockSerializerRead(serializers.ModelSerializer):
    """
    Элемент списка
    """

    icon = ImageSerializer()

    class Meta:
        model = ListItemBlock
        fields = (
            "id",
            "title",
            "description",
            "icon",
        )


class ListItemBlockSerializerWrite(serializers.ModelSerializer):
    icon = serializers.PrimaryKeyRelatedField(
        allow_null=True, required=False, queryset=Image.objects.all()
    )

    class Meta:
        model = ListItemBlock
        fields = "__all__"


class BlockListSerializer(serializers.ModelSerializer):
    """
    Список
    """

    items = ListItemBlockSerializerRead(read_only=True, many=True)

    class Meta:
        model = ListBlock
        fields = (
            "id",
            "items",
            "template",
            "fontSize",
            "iconSize",
        )


def block_list_create(data):
    items = data.pop("items")

    serializer = BlockListSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    list_instance = serializer.save()

    #  создаем и прикрепляем элементы к списку
    for order, item_data in enumerate(items):
        item_serializer = ListItemBlockSerializerWrite(data=item_data)
        item_serializer.is_valid(raise_exception=True)
        item = item_serializer.save()
        ListItemBlockRelation.objects.create(
            list=list_instance,
            item=item,
            order=order,
        )

    return list_instance


def block_list_update(list_instance, data):
    items = data.pop("items")

    serializer = BlockListSerializer(list_instance, data=data, partial=True)
    serializer.is_valid(raise_exception=True)

    # удаляем все элементы списка которые у него были раньше
    list_instance.items.filter(lists=list_instance).delete()
    # создаем и прикрепляем новые элементы к списку
    for order, item_data in enumerate(items):
        item_serializer = ListItemBlockSerializerWrite(data=item_data)
        item_serializer.is_valid(raise_exception=True)
        item = item_serializer.save()

        ListItemBlockRelation.objects.create(
            list=list_instance,
            item=item,
            order=order,
        )

    return serializer.save()


def block_list_clone(block_instance):
    block_instance_list = block_instance.list
    # достаем все элементы списка
    items = block_instance_list.items.order_by("listitemblockrelation__order")
    # todo клонируем содержимое блока
    block_instance_list.pk = None
    block_instance_list.save()
    # создаем и прикрепляем новые элементы к списку
    for order, item in enumerate(items):
        item.pk = None
        item.save()
        ListItemBlockRelation.objects.create(
            list=block_instance_list,
            item=item,
            order=order,
        )
    # todo клонируем блок
    block_instance.pk = None
    block_instance.list = block_instance_list
    block_instance.save()

    return block_instance
