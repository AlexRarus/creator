from api.models.block_type import BlockType
from api.models.image import Image, ImageTag
from rest_framework import serializers


class ImageTagSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageTag
        fields = (
            "label",
            "slug",
        )


class ImageSerializer(serializers.ModelSerializer):
    block_types = serializers.SlugRelatedField(
        slug_field="slug",
        many=True,
        queryset=BlockType.objects.all(),
    )
    tags = ImageTagSerializer(read_only=True, many=True)

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
    # При чтении будет приходить поле src
    preview = serializers.FileField(
        source="previewFile",
        use_url=False,
        read_only=True,
    )

    def update(self, image, validated_data):
        # вытаскиваем block_types из данных чтобы его нельзя было поменять
        validated_data.pop("block_types")
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
        )
