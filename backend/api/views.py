from django.db.models import Prefetch
from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from .models.block import Block
from .models.block_type import BlockType
from .models.page import Page
from .models.section import Section
from .pagination import CustomPagination
from .permissions import IsAuthorPermission, IsPagePermission
from .serializers.block import BlockSerializer
from .serializers.block_type import BlockTypeSerializer
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
        elif self.action in ["update", "partial_update", "destroy", "list"]:
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

    def get_serializer_class(self):
        if self.action == "retrieve" or self.action == "list":
            return PageReadSerializer
        return PageWriteSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    def perform_update(self, serializer):
        page = self.get_object()
        page.blocks.clear()
        serializer.save(author=self.request.user)


class BlockViewSet(viewsets.ModelViewSet):
    queryset = Block.objects.all()
    permission_classes = (IsAuthorPermission,)
    serializer_class = BlockSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class BlockTypesViewSet(mixins.ListModelMixin, GenericViewSet):
    queryset = BlockType.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = BlockTypeSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    permission_classes = (IsAuthorPermission,)
    serializer_class = SectionSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
