from .custom_router import CustomDefaultRouter
from .views import (
    AvatarViewSet,
    BlockButtonTypesViewSet,
    BlockTypesViewSet,
    BlockViewSet,
    ImageViewSet,
    PageViewSet,
    ThemeViewSet,
)

router_v1 = CustomDefaultRouter()

# /pages -> create/update
# /pages/my -> list/retrieve
# /pages/username/:slug -> retrieve

router_v1.register(
    r"v1/pages/(?P<author_username>[^/.]+)",
    PageViewSet,
    "PageViewSet",
)

# создание редактирование блоков
router_v1.register("v1/blocks", BlockViewSet)
router_v1.register("v1/block_types", BlockTypesViewSet)
router_v1.register("v1/block_button_types", BlockButtonTypesViewSet)
router_v1.register("v1/avatar", AvatarViewSet)
router_v1.register("v1/images", ImageViewSet)
router_v1.register("v1/themes", ThemeViewSet)

urlpatterns = router_v1.urls
