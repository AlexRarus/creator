import json

from django.db.models import Prefetch
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import mixins, status, viewsets
from rest_framework.decorators import action
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from .filters import ImageFilter, ImageSearchFilter, ThemeFilter
from .models.avatar import Avatar
from .models.block import Block
from .models.block_type import BlockType
from .models.image import Image
from .models.page import Page
from .models.relations import PageBlockRelation, TemplateBlockRelation
from .models.template import Template
from .models.theme import Theme, ThemeType
from .models.types.button import ButtonType
from .models.types.collapsed_list import CollapsedListItemBlock
from .models.types.list import ListItemBlock
from .pagination import CustomPagination
from .permissions import (
    IsAuthorPermission,
    IsAvatarPermission,
    IsImagePermission,
    IsPagePermission,
    IsTemplatePermission,
)
from .serializers.avatar import AvatarExistsExceptionError, AvatarSerializer
from .serializers.block import BlockSerializerRead, BlockSerializerWrite
from .serializers.block_type import BlockTypeSerializer
from .serializers.image import ImageSerializer
from .serializers.page import PageReadSerializer, PageWriteSerializer
from .serializers.template import (
    TemplateReadSerializer,
    TemplateWriteSerializer,
)
from .serializers.theme import ThemeSerializerRead, ThemeSerializerWrite
from .serializers.theme_type import ThemeTypeSerializer
from .serializers.types.avatar import block_avatar_clone
from .serializers.types.button import (
    ButtonTypeSerializerRead,
    block_button_clone,
)
from .serializers.types.collapsed_list import block_collapsed_list_clone
from .serializers.types.list import block_list_clone
from .serializers.types.separator import block_separator_clone
from .serializers.types.text import block_text_clone


class TemplateViewSet(viewsets.ModelViewSet):
    pagination_class = CustomPagination
    lookup_field = "slug"

    def get_permissions(self):
        if self.action in ["retrieve"]:
            return [AllowAny()]
        elif self.action in [
            "create",
            "update",
            "partial_update",
            "destroy",
            "list",
        ]:
            return [IsTemplatePermission()]
        else:
            return [AllowAny()]

    def get_queryset(self):
        return Template.objects.prefetch_related(
            Prefetch(
                "blocks",
                queryset=Block.objects.order_by(
                    "templateblockrelation__order"
                ),
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
            Prefetch(
                "blocks__collapsed_list__items",
                queryset=CollapsedListItemBlock.objects.order_by(
                    "collapsedlistitemblockrelation__order"
                ),
            ),
        )

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
            return TemplateReadSerializer
        return TemplateWriteSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def perform_update(self, serializer):
        serializer.save(author=self.request.user)


class PageViewSet(viewsets.ModelViewSet):
    pagination_class = CustomPagination
    lookup_field = "slug"

    """
    Create a model instance by template.
    """

    @action(["post"], detail=False)
    def create_by_template(self, request, *args, **kwargs):
        templateId = request.data.get("templateId", None)
        template = get_object_or_404(Template, id=templateId)
        template_theme = template.theme
        template_blocks = template.blocks.order_by(
            "templateblockrelation__order"
        )
        cloned_blocks_ids = []

        # todo клонируем все блоки из шаблона
        for block in template_blocks.all():
            cloned_block = None
            if block.type.slug == "text":
                cloned_block = block_text_clone(block)
            elif block.type.slug == "button":
                cloned_block = block_button_clone(block)
            elif block.type.slug == "section":
                from api.serializers.types.section import block_section_clone

                cloned_block = block_section_clone(block)
            elif block.type.slug == "avatar":
                cloned_block = block_avatar_clone(block)
            elif block.type.slug == "list":
                cloned_block = block_list_clone(block)
            elif block.type.slug == "collapsed_list":
                cloned_block = block_collapsed_list_clone(block)
            elif block.type.slug == "separator":
                cloned_block = block_separator_clone(block)
            else:
                raise ValidationError({"error": ["неизвестный тип блока"]})

            if cloned_block:
                cloned_blocks_ids.append(cloned_block.id)

        data = {"blocks": cloned_blocks_ids, "label": template.label}

        # todo создаем новую страницу и проверяем данные на валидность
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)

        # todo выставляем пользователю тему из шаблона
        request.user.theme = template_theme
        request.user.save()

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

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
            Prefetch(
                "blocks__collapsed_list__items",
                queryset=CollapsedListItemBlock.objects.order_by(
                    "collapsedlistitemblockrelation__order"
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
        page_slug = self.request.data.get("page_slug", None)
        template_slug = self.request.data.get("template_slug", None)
        if page_slug:
            page = get_object_or_404(
                Page,
                author=self.request.user,
                slug=page_slug,
            )
            serializer.save(
                author=self.request.user,
                page=page,
                type=BlockType.objects.get(slug=self.request.data["type"]),
            )
        else:
            template = get_object_or_404(
                Template,
                slug=template_slug,
            )
            serializer.save(
                author=self.request.user,
                template=template,
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
    mixins.UpdateModelMixin,
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
    search_fields = ("search",)

    def get_object(self):
        if self.action in ["destroy"]:
            # при удалении ждем массив ids в теле запроса
            return None
        if self.action in ["update"]:
            # при обновлении ждем id в теле запроса
            return get_object_or_404(Image, pk=self.request.data.get("id"))
        return get_object_or_404(Image, pk=self.kwargs.get("pk"))

    def perform_create(self, serializer):
        """Если админ присылает isCommon то картинка становится общей"""
        is_common_str = self.request.data.get("isCommon", "false")
        is_common = json.loads(is_common_str)
        is_admin = self.request.user.is_admin

        serializer.save(
            author=self.request.user, is_common=is_common and is_admin
        )

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
        queryset = self.filter_queryset(self.get_queryset()).filter(
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
    filter_backends = (DjangoFilterBackend,)
    filter_class = ThemeFilter

    def get_serializer_class(self):
        if self.action == "retrieve" or self.action == "list":
            return ThemeSerializerRead
        return ThemeSerializerWrite

    def get_object(self):
        if self.action in ["update"]:
            # при обновлении ждем id в теле запроса
            return get_object_or_404(Theme, pk=self.request.data.get("id"))
        return get_object_or_404(Theme, pk=self.kwargs.get("pk"))

    def perform_create(self, serializer):
        """
        Если запрос пришел от админа, то учитываем тип темы при создании
        иначе просто создаем кастомную тему
        """
        is_admin = self.request.user.is_admin
        theme_type_slug = self.request.data.pop("themeType", "custom")
        slug = theme_type_slug if is_admin else "custom"
        theme_type, created = ThemeType.objects.get_or_create(slug=slug)
        serializer.save(author=self.request.user, type=theme_type)

    def create(self, request, *args, **kwargs):
        data = request.data.dict()
        if data.get("backgroundImage") == "null":
            data["backgroundImage"] = None
        if data.get("animation") == "null":
            data["animation"] = None

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    def perform_update(self, serializer):
        serializer.save(author=self.request.user)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", False)
        instance = self.get_object()
        data = request.data.dict()

        if data.get("backgroundImage") == "null":
            data["backgroundImage"] = None
        if data.get("animation") == "null":
            data["animation"] = None

        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if getattr(instance, "_prefetched_objects_cache", None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)

    @action(["post"], detail=True)
    def select(self, request, *args, **kwargs):
        theme = self.get_object()
        request.user.theme = theme
        request.user.save()

        return Response(status=status.HTTP_200_OK)


class ThemeTypesViewSet(mixins.ListModelMixin, GenericViewSet):
    queryset = ThemeType.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = ThemeTypeSerializer

    def list(self, request, *args, **kwargs):
        """Ответ БЕЗ пагинации"""
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
