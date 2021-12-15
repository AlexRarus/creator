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
    # При чтении будет приходить поле src
    src = serializers.FileField(
        source="file",
        use_url=False,
        read_only=True,
    )

    class Meta:
        model = Image
        fields = (
            "id",
            "file",  # Запись
            "src",  # Чтение
            "author",
            "block_types",
            "tags",
        )
