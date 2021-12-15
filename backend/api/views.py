from django.db.models import Prefetch
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from .filters import ImageFilter, ImageSearchFilter
from .models.avatar import Avatar
from .models.block import Block
from .models.block_type import BlockType
from .models.image import Image
from .models.page import Page
from .models.relations import PageBlockRelation
from .models.theme import Theme
from .models.types.button import ButtonType
from .models.types.list import ListItemBlock
from .pagination import CustomPagination
from .permissions import (
    IsAuthorPermission,
    IsAvatarPermission,
    IsImagePermission,
    IsPagePermission,
)
from .serializers.avatar import AvatarExistsExceptionError, AvatarSerializer
from .serializers.block import BlockSerializerRead, BlockSerializerWrite
from .serializers.block_type import BlockTypeSerializer
from .serializers.image import ImageSerializer
from .serializers.page import PageReadSerializer, PageWriteSerializer
from .serializers.theme import ThemeSerializer
from .serializers.types.button import ButtonTypeSerializerRead


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
            Prefetch(
                "blocks__section__blocks",
                queryset=Block.objects.order_by("sectionblockrelation__order"),
            ),
            Prefetch(
                "blocks__list__items",
                queryset=ListItemBlock.objects.order_by(
                    "listitemblockrelation__order"
                ),
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
        serializer.save(author=self.request.user)


class BlockViewSet(viewsets.ModelViewSet):
    queryset = Block.objects.all()
    permission_classes = (IsAuthorPermission,)

    def get_serializer_class(self):
        if self.action == "retrieve" or self.action == "list":
            return BlockSerializerRead
        return BlockSerializerWrite

    def perform_create(self, serializer):
        page = get_object_or_404(
            Page,
            author=self.request.user,
            slug=self.request.data["page_slug"],
        )
        serializer.save(
            author=self.request.user,
            page=page,
            type=BlockType.objects.get(slug=self.request.data["type"]),
        )

    def perform_destroy(self, instance):
        if instance.type.slug == "section":
            # находим связь блока со страницей
            page_relations = PageBlockRelation.objects.filter(block=instance)
            for page_relation in page_relations:
                # находим все блоки прикрепленные к странице в сортировке
                # создаем из них list
                page = page_relation.page
                order = page_relation.order
                page_blocks_list = list(
                    page.blocks.order_by("pageblockrelation__order").all()
                )
                section_blocks_list = list(
                    instance.section.blocks.order_by(
                        "sectionblockrelation__order"
                    ).all()
                )
                page_blocks_list[order:order] = section_blocks_list
                page.blocks.clear()  # открепляем все блоки от страницы
                # прикрепляем в новом порядке
                for block in page_blocks_list:
                    PageBlockRelation.objects.update_or_create(
                        page=page,
                        block=block,
                        order=order,
                    )
        instance.delete()


class BlockTypesViewSet(mixins.ListModelMixin, GenericViewSet):
    queryset = BlockType.objects.filter(in_list=True)
    permission_classes = (AllowAny,)
    serializer_class = BlockTypeSerializer


class BlockButtonTypesViewSet(mixins.ListModelMixin, GenericViewSet):
    queryset = ButtonType.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = ButtonTypeSerializerRead


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


class ImageViewSet(
    mixins.ListModelMixin,
    mixins.CreateModelMixin,
    mixins.DestroyModelMixin,
    GenericViewSet,
):
    queryset = Image.objects.all()
    pagination_class = CustomPagination
    permission_classes = (IsImagePermission,)
    serializer_class = ImageSerializer
    filter_backends = (
        DjangoFilterBackend,
        ImageSearchFilter,
    )
    filter_class = ImageFilter
    search_fields = ("^tags__label", "^tags__slug")

    def get_object(self):
        if self.action in ["destroy"]:
            # при удалении ждем массив ids в теле запроса
            return None
        return get_object_or_404(Image, pk=self.kwargs.get("pk"))

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def perform_destroy(self, instance):
        # удаляем несколько элементов сразу
        images_ids = self.request.data["imagesIds"]
        Image.objects.filter(id__in=images_ids).delete()

    def list(self, request, *args, **kwargs):
        """При запросе обычного списка изображений
        возвращаем только те у которых is_common=True"""
        queryset = self.filter_queryset(self.get_queryset()).filter(
            is_common=True
        )

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(["get"], detail=False)
    def my(self, request, *args, **kwargs):
        """При запросе списка изображений с модификатором /my/
        возвращаем только те у которых author=request.user"""
        queryset = self.filter_queryset(self.queryset).filter(
            author=request.user,
        )
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)

        return Response(status=status.HTTP_200_OK, data=serializer.data)


class ThemeViewSet(viewsets.ModelViewSet):
    queryset = Theme.objects.all()
    permission_classes = (IsAuthorPermission,)
    serializer_class = ThemeSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def perform_update(self, serializer):
        serializer.save(author=self.request.user)
