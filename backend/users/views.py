from django.contrib.auth import logout
from djoser.views import UserViewSet
from rest_framework import status
from rest_framework.authentication import SessionAuthentication
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.exceptions import TokenBackendError, TokenError
from rest_framework_simplejwt.token_blacklist.models import (
    BlacklistedToken,
    OutstandingToken,
)
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import CheckValidUsernameSerializer, UpdateUsernameSerializer


class CsrfExemptSessionAuthentication(SessionAuthentication):
    def enforce_csrf(self, request):
        return


class CustomUserViewSet(UserViewSet):
    def get_permissions(self):
        if self.action == "check_valid_username":
            self.permission_classes = [AllowAny]
        if self.action == "update_username":
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()

    def get_serializer_class(self):
        if self.action == "check_valid_username":
            return CheckValidUsernameSerializer
        if self.action == "update_username":
            return UpdateUsernameSerializer
        return super().get_serializer_class()

    @action(["post"], detail=False)
    def update_username(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.request.user
        user.username = serializer.data["username"]
        user.save()
        return Response(status=status.HTTP_200_OK)

    @action(["post"], detail=False)
    def check_valid_username(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        return Response(status=status.HTTP_200_OK, data=serializer.data)


class LogoutView(APIView):
    """Разлогинивание одного токена"""

    permission_classes = (AllowAny,)
    authentication_classes = (CsrfExemptSessionAuthentication,)

    def post(self, request):
        try:
            logout(request)
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except (
            TokenError,
            TokenBackendError,
        ) as e:
            print(e)
            return Response(status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_400_BAD_REQUEST)


class LogoutAllView(APIView):
    """Разлогинивание всех выданных токенов"""

    permission_classes = (AllowAny,)
    authentication_classes = (CsrfExemptSessionAuthentication,)

    def post(self, request):
        logout(request)
        tokens = OutstandingToken.objects.filter(user_id=request.user.id)
        for token in tokens:
            (
                t,
                _,
            ) = BlacklistedToken.objects.get_or_create(token=token)

        return Response(status=status.HTTP_205_RESET_CONTENT)
