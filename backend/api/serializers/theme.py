from api.models.theme import Theme
from rest_framework import serializers


class ThemeSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)

    def to_representation(self, obj):
        # вызывается при чтении модели
        representation = super().to_representation(obj)
        # background = {
        #     "primary": representation.pop("background_primary"),
        #     "secondary": representation.pop("background_secondary"),
        # }
        # representation["background"] = background
        return representation

    def to_internal_value(self, data):
        # вызывается перед созданием/обновлением модели
        # background = data.pop("background")
        internal = super().to_internal_value(data)
        # for attr, value in background.items():
        #     setattr(internal, f"background_{attr}", value)
        #
        return internal

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance

    class Meta:
        model = Theme
        fields = (
            "id",
            "author",
            "label",
            "slug",
            "background",
            "color",
            "headerColor",
        )
