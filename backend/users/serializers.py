from api.serializers.avatar import AvatarSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    avatar = AvatarSerializer()

    class Meta:
        fields = (
            "id",
            "first_name",
            "last_name",
            "email",
            "username",
            "avatar",
        )
        model = User
