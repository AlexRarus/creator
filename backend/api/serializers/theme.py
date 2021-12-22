from api.models.image import Image
from api.models.theme import Theme
from api.serializers.image import ImageSerializer
from rest_framework import serializers


class ThemeSerializerRead(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    type = serializers.CharField(read_only=True, source="type.slug")
    backgroundImage = ImageSerializer()

    class Meta:
        model = Theme
        fields = "__all__"


class ThemeSerializerWrite(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)
    backgroundImage = serializers.PrimaryKeyRelatedField(
        allow_null=True, required=False, queryset=Image.objects.all()
    )

    def update(self, instance, validated_data):
        # исключаем поле type для того чтобы его нельзя было изменить
        validated_data.pop("type", None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance

    class Meta:
        model = Theme
        fields = "__all__"
