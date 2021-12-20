from api.models.types.avatar import AvatarBlock
from rest_framework import serializers


class BlockAvatarSerializer(serializers.ModelSerializer):
    class Meta:
        model = AvatarBlock
        fields = ("dimension",)


def block_avatar_create(data):
    serializer = BlockAvatarSerializer(data=data)
    serializer.is_valid(raise_exception=True)
    return serializer.save()


def block_avatar_update(avatar_instance, data):
    serializer = BlockAvatarSerializer(
        avatar_instance, data=data, partial=True
    )
    serializer.is_valid(raise_exception=True)

    return serializer.save()
