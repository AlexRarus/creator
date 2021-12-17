from api.models.types.collapsed_list import (
    CollapsedListBlock,
    CollapsedListItemBlock,
    CollapsedListItemBlockRelation,
)
from rest_framework import serializers


class CollapsedListItemBlockSerializer(serializers.ModelSerializer):
    """
    Элемент списка
    """

    class Meta:
        model = CollapsedListItemBlock
        fields = (
            "id",
            "title",
            "description",
        )


class BlockCollapsedListSerializer(serializers.ModelSerializer):
    """
    Список
    """

    items = CollapsedListItemBlockSerializer(read_only=True, many=True)

    class Meta:
        model = CollapsedListBlock
        fields = (
            "id",
            "items",
        )


def block_collapsed_list_create(data):
    items = data.pop("items")
    collapsed_list_instance = CollapsedListBlock.objects.create(**data)

    #  создаем и прикрепляем элементы к списку
    for order, item_data in enumerate(items):
        item = CollapsedListItemBlock.objects.create(**item_data)
        CollapsedListItemBlockRelation.objects.create(
            list=collapsed_list_instance,
            item=item,
            order=order,
        )

    return collapsed_list_instance


def block_collapsed_list_update(collapsed_list_instance, data):
    items = data.pop("items")

    # обновляем только те свойства которые пришли
    for attr, value in data.items():
        setattr(collapsed_list_instance, attr, value)
    collapsed_list_instance.save()

    # удаляем все элементы списка которые у него были раньше
    collapsed_list_instance.items.filter(
        lists=collapsed_list_instance
    ).delete()
    # создаем и прикрепляем новые элементы к списку
    for order, item_data in enumerate(items):
        item = CollapsedListItemBlock.objects.create(**item_data)
        CollapsedListItemBlockRelation.objects.create(
            list=collapsed_list_instance,
            item=item,
            order=order,
        )

    return collapsed_list_instance
