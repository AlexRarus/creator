from django.db.models import Prefetch
from rest_framework import viewsets

from .permissions import IsAuthorPermission
from .models.page import Page
from .models.block import Block
from .models.section import Section
from .serializers.page import PageSerializer
from .serializers.block import BlockSerializer
from .serializers.section import SectionSerializer


class PageViewSet(viewsets.ModelViewSet):
    queryset = Page.objects.prefetch_related(
                Prefetch(
                    'blocks',
                    queryset=Block.objects.order_by('pageblockrelation__order')
                ),
            ).all()
    permission_classes = (IsAuthorPermission,)
    serializer_class = PageSerializer

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


class SectionViewSet(viewsets.ModelViewSet):
    queryset = Section.objects.all()
    permission_classes = (IsAuthorPermission,)
    serializer_class = SectionSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
