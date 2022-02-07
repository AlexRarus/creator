from api.models.image import Image
from api.models.theme import Theme
from api.serializers.image import ImageSerializer
from rest_framework import serializers


class ThemeSerializerRead(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    type = serializers.CharField(read_only=True, source="type.slug")
    backgroundImage = ImageSerializer()
    animation = serializers.FileField(
        use_url=False,
        read_only=True,
    )

    class Meta:
        model = Theme
        fields = "__all__"


class ThemeSerializerWrite(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    backgroundImage = serializers.PrimaryKeyRelatedField(
        allow_null=True, required=False, queryset=Image.objects.all()
    )

    def update(self, instance, validated_data):
        # исключаем поля type и animation для того чтобы его не меняли
        validated_data.pop("type", None)
        validated_data.pop("animation", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance

    class Meta:
        model = Theme
        fields = "__all__"
