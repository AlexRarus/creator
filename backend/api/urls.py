from .custom_router import CustomDefaultRouter
from .views import (
    AvatarViewSet,
    BlockButtonTypesViewSet,
    BlockTypesViewSet,
    BlockViewSet,
    ImageViewSet,
    PageViewSet,
    TemplateTypesViewSet,
    TemplateViewSet,
    ThemeTypesViewSet,
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

router_v1.register(r"v1/templates", TemplateViewSet, "TemplateViewSet")

# создание редактирование блоков
router_v1.register("v1/blocks", BlockViewSet)
router_v1.register("v1/block_types", BlockTypesViewSet)
router_v1.register("v1/block_button_types", BlockButtonTypesViewSet)
router_v1.register("v1/avatar", AvatarViewSet)
router_v1.register("v1/images", ImageViewSet, "ImagesViewSet")
router_v1.register("v1/themes", ThemeViewSet)
router_v1.register("v1/themes_types", ThemeTypesViewSet)
router_v1.register("v1/templates_types", TemplateTypesViewSet)

urlpatterns = router_v1.urls
