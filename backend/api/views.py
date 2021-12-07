from django.db.models import Prefetch
from django.shortcuts import get_object_or_404
from rest_framework import mixins, status, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from .models.avatar import Avatar
from .models.block import Block
from .models.block_type import BlockType
from .models.image import Image
from .models.page import Page
from .models.section import DroppableSection
from .pagination import CustomPagination
from .permissions import (
    IsAuthorPermission,
    IsAvatarPermission,
    IsImagePermission,
    IsPagePermission,
)
from .serializers.avatar import AvatarExistsExceptionError, AvatarSerializer
from .serializers.block import BlockReadSerializer, BlockWriteSerializer
from .serializers.block_type import BlockTypeSerializer
from .serializers.image import ImageSerializer
from .serializers.page import PageReadSerializer, PageWriteSerializer
from .serializers.section import SectionSerializer


class PageViewSet(viewsets.ModelViewSet):
    pagination_class = CustomPagination
    lookup_field = "slug"

    def get_permissions(self):
        if self.action in ["retrieve"]:
            return [AllowAny()]
        elif self.action in ["create"]:
            return [IsAuthenticated()]
        elif self.action in [
            "update",
            "partial_update",
            "destroy",
            "list",
        ]:
            return [IsPagePermission()]
        else:
            return [AllowAny()]

    def get_queryset(self):
        author_username = self.kwargs.get("author_username")
        if author_username == "my":
            author_username = self.request.user.username
        return Page.objects.prefetch_related(
            Prefetch(
                "blocks",
                queryset=Block.objects.order_by("pageblockrelation__order"),
            ),
        ).filter(author__username=author_username)

    def get_object(self):
        lookup_field = self.kwargs["slug"]
        if self.action == "retrieve":
            return get_object_or_404(
                self.get_queryset(),
                slug=lookup_field,
            )
        else:
            return get_object_or_404(
                self.get_queryset(),
                id=lookup_field,
            )

    def get_serializer_class(self):
        if self.action == "retrieve" or self.action == "list":
            return PageReadSerializer
        return PageWriteSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def perform_update(self, serializer):
        page = self.get_object()
        if self.request.data.get("blocks"):
            page.blocks.clear()
        serializer.save(author=self.request.user)


class BlockViewSet(viewsets.ModelViewSet):
    queryset = Block.objects.all()
    permission_classes = (IsAuthorPermission,)

    def get_serializer_class(self):
        if self.action == "retrieve" or self.action == "list":
            return BlockReadSerializer
        return BlockWriteSerializer

    def perform_create(self, serializer):
        page = get_object_or_404(
            Page,
            author=self.request.user,
            slug=self.request.data["page_slug"],
        )
        serializer.save(author=self.request.user, page=page)


class BlockTypesViewSet(mixins.ListModelMixin, GenericViewSet):
    queryset = BlockType.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = BlockTypeSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class SectionViewSet(viewsets.ModelViewSet):
    queryset = DroppableSection.objects.all()
    permission_classes = (IsAuthorPermission,)
    serializer_class = SectionSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class AvatarViewSet(
    mixins.CreateModelMixin,
    mixins.UpdateModelMixin,
    mixins.DestroyModelMixin,
    mixins.RetrieveModelMixin,
    GenericViewSet,
):
    queryset = Avatar.objects.all()
    permission_classes = (IsAvatarPermission,)
    serializer_class = AvatarSerializer
    lookup_field = "username"

    def get_object(self):
        if self.action in ["update", "destroy"]:
            return self.request.user.avatar
        username = self.kwargs.get("username")
        return get_object_or_404(Avatar, user__username=username)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        try:
            return super(AvatarViewSet, self).create(request, *args, **kwargs)
        except AvatarExistsExceptionError:
            content = {"error": "У вас уже есть аватар"}
            return Response(
                content,
                status=status.HTTP_400_BAD_REQUEST,
            )

    def update(self, request, *args, **kwargs):
        try:
            return super(AvatarViewSet, self).update(request, *args, **kwargs)
        except Avatar.DoesNotExist:
            content = {"error": "У вас еще нет аватара"}
            return Response(
                content,
                status=status.HTTP_400_BAD_REQUEST,
            )

    def destroy(self, request, *args, **kwargs):
        try:
            return super(AvatarViewSet, self).destroy(request, *args, **kwargs)
        except Avatar.DoesNotExist:
            content = {"error": "У вас еще нет аватара"}
            return Response(
                content,
                status=status.HTTP_400_BAD_REQUEST,
            )


class ImageViewSet(viewsets.ModelViewSet):
    queryset = Image.objects.all()
    permission_classes = (IsImagePermission,)
    serializer_class = ImageSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def perform_update(self, serializer):
        serializer.save(author=self.request.user)
