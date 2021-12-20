from api.models.block import Block
from api.models.image import Image
from api.models.relations import PageBlockRelation, SectionBlockRelation
from api.models.types.section import Section
from api.serializers.block import BlockSerializerRead
from rest_framework import serializers

from ..image import ImageSerializer


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

    serializer = BlockSectionSerializerWrite(
        section_instance, data=data, partial=True
    )
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
