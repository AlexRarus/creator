from api.models.types.avatar import AvatarBlock
from rest_framework import serializers


class BlockAvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvatarBlock
        fields = ("dimension",)


def block_avatar_create(data):
    return AvatarBlock.objects.create(**data)


def block_avatar_update(avatar_instance, data):
    # обновляем только те свойства которые пришли
    for attr, value in data.items():
        setattr(avatar_instance, attr, value)

    avatar_instance.save()
