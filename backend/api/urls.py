from rest_framework.routers import DefaultRouter

from .views import BlockViewSet, PageViewSet, SectionViewSet

router_v1 = DefaultRouter()

router_v1.register("v1/pages", PageViewSet)
router_v1.register("v1/blocks", BlockViewSet)
router_v1.register("v1/sections", SectionViewSet)

urlpatterns = router_v1.urls
