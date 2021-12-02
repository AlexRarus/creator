from api.models.avatar import Avatar
from rest_framework import serializers


class AvatarExistsExceptionError(Exception):
    pass


class AvatarSerializer(serializers.ModelSerializer):
    # При создании или редактировании аватара присылать поле file
    sourceFile = serializers.FileField(
        use_url=False,
        allow_empty_file=True,
        required=False,
        allow_null=True,
        write_only=True,
    )
    previewFile = serializers.FileField(
        use_url=False,
        allow_empty_file=True,
        required=False,
        allow_null=True,
        write_only=True,
    )
    # При чтении будет приходить поле src
    source = serializers.FileField(
        source="sourceFile",
        use_url=False,
        read_only=True,
    )
    preview = serializers.FileField(
        source="previewFile",
        use_url=False,
        read_only=True,
    )

    class Meta:
        model = Avatar
        fields = (
            "id",
            "sourceFile",  # Запись
            "previewFile",  # Запись
            "source",  # Чтение
            "preview",  # Чтение
            "x",
            "y",
            "width",
            "height",
            "borderRadius",
            "rotate",
            "scale",
        )

    def create(self, validated_data):
        # Если аватарка уже есть, обновляем текущую
        avatar = Avatar.objects.get(user=validated_data.get("user"))
        if avatar:
            return self.update(avatar, validated_data)
        avatar = Avatar.objects.create(**validated_data)
        return avatar

    def update(self, avatar, validated_data):
        # Если оставить поле file пустым, то оно не будет перезаписываться
        validated_source_file = validated_data.get("sourceFile")
        validated_preview_file = validated_data.get("previewFile")

        avatar.x = validated_data.get("x", avatar.x)
        avatar.y = validated_data.get("y", avatar.y)
        avatar.width = validated_data.get("width", avatar.width)
        avatar.height = validated_data.get("height", avatar.height)
        avatar.borderRadius = validated_data.get(
            "borderRadius", avatar.borderRadius
        )
        avatar.rotate = validated_data.get("rotate", avatar.rotate)
        avatar.scale = validated_data.get("scale", avatar.scale)

        if validated_source_file:
            avatar.sourceFile = validated_source_file

        if validated_preview_file:
            avatar.previewFile = validated_preview_file

        avatar.save()

        return avatar
