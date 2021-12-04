from api.models.block import Block
from api.models.relations import SectionBlockRelation
from api.models.types.section import Section
from api.serializers.block import BlockSerializerRead
from django.db.models import Prefetch
from rest_framework import serializers


class SectionSerializerRead(serializers.ModelSerializer):
    blocks = BlockSerializerRead(read_only=True, many=True)

    class Meta:
        model = Section
        fields = (
            "id",
            "blocks",
            "label",
            "background",
        )


def create_section(data):
    blocks_ids = data.pop("blocks")
    blocks = Block.objects.filter(id__in=blocks_ids)
    section = Section.objects.create(**data)

    for order, block in enumerate(blocks):
        SectionBlockRelation.objects.update_or_create(
            section=section,
            block=block,
            order=order,
        )

    return section


def update_section(section, data):
    blocks_ids = data.pop("blocks", None)

    section.label = data.get("label", section.label)
    section.background = data.get("background", section.background)
    section.save()

    if blocks_ids is not None:
        blocks = Block.objects.filter(id__in=blocks_ids)
        section.blocks.clear()
        for order, block in enumerate(blocks):
            SectionBlockRelation.objects.update_or_create(
                section=section,
                block=block,
                order=order,
            )

    # для того чтобы возвращалась нужная сортировка
    return Section.objects.prefetch_related(
        Prefetch(
            "blocks",
            queryset=Block.objects.order_by("sectionblockrelation__order"),
        ),
    ).get(id=section.id)
