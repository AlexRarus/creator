from api.models.page import Page
from api.serializers.avatar import AvatarSerializer
from api.serializers.theme import ThemeSerializerRead
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

User = get_user_model()


class IndexPageSerializerRead(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ("id", "slug")


class UserSerializer(serializers.ModelSerializer):
    avatar = AvatarSerializer(read_only=True)
    theme = ThemeSerializerRead(read_only=True)
    index_page = IndexPageSerializerRead(read_only=True)

    class Meta:
        fields = (
            "id",
            "first_name",
            "last_name",
            "email",
            "username",
            "avatar",
            "theme",
            "role",
            "index_page",
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


class UpdateUserIndexPageSerializer(serializers.ModelSerializer):
    index_page = serializers.PrimaryKeyRelatedField(
        queryset=Page.objects.all(), allow_null=True, allow_empty=True
    )

    class Meta:
        model = User
        fields = ("index_page",)

    def validate(self, data):
        """
        Проверка принадлежности страницы
        """
        target_user = self.context.get("request").user
        index_page = data["index_page"]
        if index_page and index_page.author.id != target_user.id:
            raise serializers.ValidationError(
                "Страница не принадлежит текущему пользователю"
            )
        return data

    def save(self, **kwargs):
        kwargs["index_page"] = self.validated_data.get("index_page")
        return super().save(**kwargs)

    def update(self, user, validated_data):
        user.index_page = validated_data["index_page"]
        user.save()
        return user
