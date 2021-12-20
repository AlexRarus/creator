from api.models.image import Image
from api.models.types.list import (
    ListBlock,
    ListItemBlock,
    ListItemBlockRelation,
)
from rest_framework import serializers

from ..image import ImageSerializer


class ListItemBlockSerializer(serializers.ModelSerializer):
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


class BlockListSerializer(serializers.ModelSerializer):
    """
    Список
    """

    items = ListItemBlockSerializer(read_only=True, many=True)

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
    list_instance = ListBlock.objects.create(**data)

    #  создаем и прикрепляем элементы к списку
    for order, item_data in enumerate(items):
        item = ListItemBlock.objects.create(**item_data)
        ListItemBlockRelation.objects.create(
            list=list_instance,
            item=item,
            order=order,
        )

    return list_instance


def block_list_update(list_instance, data):
    items = data.pop("items")

    # обновляем только те свойства которые пришли
    for attr, value in data.items():
        setattr(list_instance, attr, value)
    list_instance.save()

    # удаляем все элементы списка которые у него были раньше
    list_instance.items.filter(lists=list_instance).delete()
    # создаем и прикрепляем новые элементы к списку
    for order, item_data in enumerate(items):
        icon_id = item_data.pop("icon", None)
        icon = None

        if icon_id is not None:
            try:
                icon = Image.objects.get(id=icon_id)
            except Image.DoesNotExist:
                icon = None

        item = ListItemBlock.objects.create(**item_data, icon=icon)
        ListItemBlockRelation.objects.create(
            list=list_instance,
            item=item,
            order=order,
        )

    return list_instance
