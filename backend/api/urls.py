from rest_framework.routers import DefaultRouter

from .views import BlockTypesViewSet, BlockViewSet, PageViewSet, SectionViewSet

router_v1 = DefaultRouter()

# /pages -> create/update
# /pages/my -> list/retrieve
# /pages/username/:slug -> retrieve

router_v1.register(
    r"v1/pages/(?P<author_username>[^/.]+)", PageViewSet, "PageViewSet"
)

router_v1.register("v1/blocks", BlockViewSet)
router_v1.register("v1/block_types", BlockTypesViewSet)
router_v1.register("v1/sections", SectionViewSet)

urlpatterns = router_v1.urls
