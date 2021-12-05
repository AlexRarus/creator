from api.models.block import Block
from api.models.relations import PageBlockRelation, SectionBlockRelation
from api.models.types.section import Section
from api.serializers.block import BlockSerializerRead
from rest_framework import serializers


class SectionSerializerRead(serializers.ModelSerializer):
    # При создании или редактировании секции
    backgroundFile = serializers.FileField(
        use_url=False,
        allow_empty_file=True,
        required=False,
        allow_null=True,
        write_only=True,
    )
    # При чтении будет приходить поле backgroundUrl
    backgroundUrl = serializers.FileField(
        source="backgroundFile",
        use_url=False,
        read_only=True,
    )

    blocks = BlockSerializerRead(read_only=True, many=True)

    class Meta:
        model = Section
        fields = (
            "id",
            "blocks",
            "label",
            "background",
            "backgroundFile",  # Запись
            "backgroundUrl",  # Чтение
            "borderRadius",
            "paddingTop",
            "paddingBottom",
            "paddingRight",
            "paddingLeft",
        )


def create_section(data):
    blocks_ids = data.pop("blocks")
    blocks_queryset = Block.objects.filter(id__in=blocks_ids)
    # сохраняем сортировку блоков как они пришли в запросе
    blocks = [blocks_queryset.get(id=block_id) for block_id in blocks_ids]
    section = Section.objects.create(**data)

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


def update_section(section, data):
    blocks_ids = data.pop("blocks", None)

    section.label = data.get("label", section.label)
    section.background = data.get("background", section.background)
    section.save()

    if blocks_ids is not None:
        blocks_queryset = Block.objects.filter(id__in=blocks_ids)
        # сохраняем сортировку блоков как они пришли в запросе
        blocks = [blocks_queryset.get(id=block_id) for block_id in blocks_ids]

        section.blocks.clear()
        for order, block in enumerate(blocks):
            SectionBlockRelation.objects.update_or_create(
                section=section,
                block=block,
                order=order,
            )

        #  открепляем блоки от страницы
        PageBlockRelation.objects.filter(block__in=blocks).delete()

    return section
