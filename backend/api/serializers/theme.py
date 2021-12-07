from api.models.theme import Theme
from rest_framework import serializers


# TODO реализовать проверку вложенных свойств через сериализаторы
class BackgroundSerializer(serializers.Serializer):
    primary = serializers.CharField(allow_blank=False)
    secondary = serializers.CharField(allow_blank=False)


class ThemeSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)

    def to_representation(self, obj):
        # вызывается при чтении модели
        representation = super().to_representation(obj)
        background = {
            "primary": representation.pop("background_primary"),
            "secondary": representation.pop("background_secondary"),
        }
        representation["background"] = background
        return representation

    def to_internal_value(self, data):
        # вызывается перед созданием/обновлением модели
        background_outer = data.pop("background")
        internal = super().to_internal_value(data)
        internal["background_primary"] = background_outer.get("primary")
        internal["background_secondary"] = background_outer.get("secondary")
        return internal

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            new_value = value if value is not None else getattr(instance, attr)
            setattr(instance, attr, new_value)
        instance.save()

        return instance

    class Meta:
        model = Theme
        fields = (
            "id",
            "author",
            "label",
            "slug",
            "background_primary",
            "background_secondary",
            "color",
            "headerColor",
        )
