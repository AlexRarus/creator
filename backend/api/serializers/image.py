from api.models.block_type import BlockType
from api.models.image import Image, ImageTag
from rest_framework import serializers


class ImageSerializer(serializers.ModelSerializer):
    block_types = serializers.SlugRelatedField(
        slug_field="slug",
        many=True,
        queryset=BlockType.objects.all(),
    )
    tags = serializers.SlugRelatedField(
        slug_field="slug",
        many=True,
        queryset=ImageTag.objects.all(),
    )

    # При создании или редактировании картинки присылать поле file
    file = serializers.FileField(
        use_url=False,
        allow_empty_file=True,
        required=False,
        allow_null=True,
        write_only=True,
    )
    # При создании или редактировании картинки присылать поле file
    previewFile = serializers.FileField(
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
    # При чтении будет приходить поле preview
    preview = serializers.FileField(
        source="previewFile",
        use_url=False,
        read_only=True,
    )
    is_common = serializers.BooleanField(write_only=True)

    def update(self, image, validated_data):
        # вытаскиваем block_types и tags из данных
        # чтобы его нельзя было поменять
        validated_data.pop("block_types")
        validated_data.pop("tags")
        # Перезаписываем только те поля которые были переданы
        for attr, value in validated_data.items():
            setattr(image, attr, value)

        image.save()

        return image

    class Meta:
        model = Image
        fields = (
            "id",
            "file",  # Запись
            "previewFile",  # Запись
            "src",  # Чтение
            "preview",  # Чтение
            "author",
            "block_types",
            "tags",
            "x",
            "y",
            "width",
            "height",
            "borderRadius",
            "rotate",
            "scale",
            "ratio",
            "is_common",  # Запись
        )
