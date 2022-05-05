from api.models.block import Block
from api.models.image import Image
from api.models.relations import PageBlockRelation, SectionBlockRelation
from api.models.types.section import Section
from api.serializers.block import BlockSerializerRead
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from ..image import ImageSerializer
from .avatar import block_avatar_clone
from .button import block_button_clone
from .collapsed_list import block_collapsed_list_clone
from .list import block_list_clone
from .separator import block_separator_clone
from .text import block_text_clone


class BlockSectionSerializerRead(serializers.ModelSerializer):
    backgroundImage = ImageSerializer(read_only=True)
    blocks = BlockSerializerRead(read_only=True, many=True)

    class Meta:
        model = Section
        fields = "__all__"


class BlockSectionSerializerWrite(serializers.ModelSerializer):
    backgroundImage = serializers.PrimaryKeyRelatedField(
        allow_null=True, required=False, queryset=Image.objects.all()
    )
    blocks = serializers.PrimaryKeyRelatedField(
        required=False, many=True, queryset=Block.objects.all()
    )

    class Meta:
        model = Section
        fields = "__all__"


def block_section_create(data):
    blocks_ids = data.pop("blocks")
    blocks_queryset = Block.objects.filter(id__in=blocks_ids)
    # сохраняем сортировку блоков как они пришли в запросе
    blocks = [blocks_queryset.get(id=block_id) for block_id in blocks_ids]

    serializer = BlockSectionSerializerWrite(data=data)
    serializer.is_valid(raise_exception=True)
    section = serializer.save()

    #  прикрепляем блоки к секции
    for order, block in enumerate(blocks):
        SectionBlockRelation.objects.update_or_create(
            section=section,
            block=block,
            order=order,
        )

    #  открепляем блоки от страницы
    PageBlockRelation.objects.filter(block__in=blocks).delete()

    return section


def block_section_update(section_instance, data):
    blocks_ids = data.pop("blocks", None)

    serializer = BlockSectionSerializerWrite(section_instance, data=data)
    serializer.is_valid(raise_exception=True)

    if blocks_ids is not None:
        blocks_queryset = Block.objects.filter(id__in=blocks_ids)
        # сохраняем сортировку блоков как они пришли в запросе
        blocks = [blocks_queryset.get(id=block_id) for block_id in blocks_ids]

        # открепляем старые блоки и прикрепляем новые к секции
        section_instance.blocks.clear()
        for order, block in enumerate(blocks):
            SectionBlockRelation.objects.update_or_create(
                section=section_instance,
                block=block,
                order=order,
            )

        # открепляем блоки от страницы
        PageBlockRelation.objects.filter(block__in=blocks).delete()

    return serializer.save()


def block_section_clone(block_instance):
    block_instance_section = block_instance.section
    # вытаскиваем блоки из секции в нужной сортировке
    block_instance_section_blocks = block_instance_section.blocks.order_by(
        "sectionblockrelation__order"
    )

    cloned_inner_blocks = []

    # todo клонируем все блоки из секции
    for inner_block in block_instance_section_blocks:
        cloned_inner_block = None
        if inner_block.type.slug == "text":
            cloned_inner_block = block_text_clone(inner_block)
        elif inner_block.type.slug == "button":
            cloned_inner_block = block_button_clone(inner_block)
        elif inner_block.type.slug == "avatar":
            cloned_inner_block = block_avatar_clone(inner_block)
        elif inner_block.type.slug == "list":
            cloned_inner_block = block_list_clone(inner_block)
        elif inner_block.type.slug == "collapsed_list":
            cloned_inner_block = block_collapsed_list_clone(inner_block)
        elif inner_block.type.slug == "separator":
            cloned_inner_block = block_separator_clone(inner_block)
        else:
            raise ValidationError({"error": ["неизвестный тип блока"]})

        if cloned_inner_block:
            cloned_inner_blocks.append(cloned_inner_block)

    # todo клонируем содержимое блока
    block_instance_section.pk = None
    block_instance_section.save()

    #  прикрепляем блоки к секции
    for order, block in enumerate(cloned_inner_blocks):
        SectionBlockRelation.objects.update_or_create(
            section=block_instance_section,
            block=block,
            order=order,
        )

    # todo клонируем блок
    block_instance.pk = None
    block_instance.section = block_instance_section
    block_instance.save()

    return block_instance
