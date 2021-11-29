from api.models.avatar import Avatar
from rest_framework import serializers


class AvatarExistsExceptionError(Exception):
    pass


class AvatarSerializer(serializers.ModelSerializer):
    # При создании или редактировании аватара присылать поле file
    file = serializers.FileField(
        use_url=False,
        allow_empty_file=True,
        required=False,
        allow_null=True,
        write_only=True,
    )
    # При чтении будет приходить поле src
    src = serializers.FileField(
        source="file",
        use_url=False,
        read_only=True,
    )

    class Meta:
        model = Avatar
        fields = (
            "id",
            "file",  # Запись
            "src",  # Чтение
            "x",
            "y",
            "width",
            "height",
            "border_radius",
            "rotate",
        )

    def create(self, validated_data):
        # Если аватарка уже есть, нельзя создать вторую
        if Avatar.objects.filter(user=validated_data.get("user")).exists():
            raise AvatarExistsException
        avatar = Avatar.objects.create(**validated_data)
        return avatar

    def update(self, avatar, validated_data):
        # Если оставить поле file пустым, то оно не будет перезаписываться
        validated_file = validated_data.get("file")

        avatar.x = validated_data.get("x", avatar.x)
        avatar.y = validated_data.get("y", avatar.y)
        avatar.width = validated_data.get("width", avatar.width)
        avatar.height = validated_data.get("height", avatar.height)
        avatar.border_radius = validated_data.get(
            "border_radius", avatar.border_radius
        )
        avatar.rotate = validated_data.get("rotate", avatar.rotate)

        if validated_file:
            avatar.file = validated_file

        avatar.save()

        return avatar
