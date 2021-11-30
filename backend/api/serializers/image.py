from api.models.image import Image
from rest_framework import serializers


class ImageSerializer(serializers.ModelSerializer):
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
        )

    def update(self, image, validated_data):
        # Если оставить поле file пустым, то оно не будет перезаписываться
        validated_file = validated_data.get("file")

        if validated_file:
            image.file = validated_file

        image.save()

        return image
