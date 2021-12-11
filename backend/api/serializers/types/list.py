from api.models.types.list import (
    ListBlock,
    ListItemBlock,
    ListItemBlockRelation,
)
from rest_framework import serializers


class ListItemBlockSerializer(serializers.ModelSerializer):
    """
    Элемент списка
    """

    class Meta:
        model = ListItemBlock
        fields = (
            "id",
            "title",
            "description",
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
        item = ListItemBlock.objects.create(**item_data)
        ListItemBlockRelation.objects.create(
            list=list_instance,
            item=item,
            order=order,
        )

    return list_instance
