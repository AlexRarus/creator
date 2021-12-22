from api.serializers.avatar import AvatarSerializer
from api.serializers.theme import ThemeSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    avatar = AvatarSerializer(read_only=True)
    theme = ThemeSerializer(read_only=True)

    class Meta:
        fields = (
            "id",
            "first_name",
            "last_name",
            "email",
            "username",
            "avatar",
            "theme",
        )
        model = User


class CheckValidUsernameSerializer(serializers.Serializer):
    username = serializers.SlugField(allow_null=False, allow_blank=False)

    default_error_messages = {
        "not_uniq": "Такое имя пользователя уже существует.",
    }

    def validate(self, attrs):
        validated_data = super().validate(attrs)

        key_error = None

        try:
            User.objects.get(username=self.initial_data.get("username"))
            key_error = "not_uniq"
        except User.DoesNotExist:
            pass

        if key_error is not None:
            raise ValidationError(
                {"username": [self.error_messages[key_error]]}, code=key_error
            )

        return validated_data


class UpdateUsernameSerializer(
    CheckValidUsernameSerializer, serializers.ModelSerializer
):
    class Meta:
        model = User
        fields = ("username",)

    def save(self, **kwargs):
        kwargs["username"] = self.validated_data.get("username")
        return super().save(**kwargs)
