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

    serializer = BlockCollapsedListSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    collapsed_list_instance = serializer.save()

    #  создаем и прикрепляем элементы к списку
    for order, item_data in enumerate(items):
        item_serializer = CollapsedListItemBlockSerializer(data=item_data)
        item_serializer.is_valid(raise_exception=True)
        item = item_serializer.save()
        CollapsedListItemBlockRelation.objects.create(
            list=collapsed_list_instance,
            item=item,
            order=order,
        )

    return collapsed_list_instance


def block_collapsed_list_update(collapsed_list_instance, data):
    items = data.pop("items")

    serializer = BlockCollapsedListSerializer(
        collapsed_list_instance, data=data, partial=True
    )
    serializer.is_valid(raise_exception=True)

    # удаляем все элементы списка которые у него были раньше
    collapsed_list_instance.items.filter(
        lists=collapsed_list_instance
    ).delete()
    # создаем и прикрепляем новые элементы к списку
    for order, item_data in enumerate(items):
        item_serializer = CollapsedListItemBlockSerializer(data=item_data)
        item_serializer.is_valid(raise_exception=True)
        item = item_serializer.save()
        CollapsedListItemBlockRelation.objects.create(
            list=collapsed_list_instance,
            item=item,
            order=order,
        )

    return serializer.save()
