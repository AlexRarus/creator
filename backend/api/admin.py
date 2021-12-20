from django.conf import settings
from django.contrib import admin

from .models.avatar import Avatar
from .models.block import Block
from .models.block_type import BlockType
from .models.image import Image, ImageTag
from .models.page import Page
from .models.pricing_plan import PricingPlan
from .models.relations import PageBlockRelation, SectionBlockRelation
from .models.theme import Theme
from .models.types.avatar import AvatarBlock
from .models.types.button import Button, ButtonType
from .models.types.collapsed_list import (
    CollapsedListBlock,
    CollapsedListItemBlock,
    CollapsedListItemBlockRelation,
)
from .models.types.list import ListBlock, ListItemBlock, ListItemBlockRelation
from .models.types.section import Section
from .models.types.text import Text


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = (
        "author",
        "file",
        "is_common",
    )
    search_fields = (
        "id",
        "author",
        "file",
    )
    empty_value_display = settings.ADMIN_EMPTY_VALUE_DISPLAY


@admin.register(ImageTag)
class ImageTagAdmin(admin.ModelAdmin):
    list_display = ("slug",)
    search_fields = ("slug",)
    empty_value_display = settings.ADMIN_EMPTY_VALUE_DISPLAY


@admin.register(Avatar)
class AvatarAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "sourceFile",
        "previewFile",
        "x",
        "y",
        "width",
        "height",
        "borderRadius",
        "rotate",
        "scale",
    )
    search_fields = (
        "id",
        "user",
        "file",
    )
    empty_value_display = settings.ADMIN_EMPTY_VALUE_DISPLAY


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "author",
        "label",
        "slug",
        # "blocks",
    )
    search_fields = (
        "id",
        "label",
        "slug",
    )
    empty_value_display = settings.ADMIN_EMPTY_VALUE_DISPLAY


@admin.register(Theme)
class ThemeAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "author",
        "label",
        "slug",
    )
    search_fields = (
        "id",
        "author",
        "label",
        "slug",
    )
    empty_value_display = settings.ADMIN_EMPTY_VALUE_DISPLAY


@admin.register(BlockType)
class BlockTypeAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "author",
        "slug",
        "label",
        "pricingPlan",
    )
    search_fields = (
        "id",
        "slug",
        "label",
    )
    empty_value_display = settings.ADMIN_EMPTY_VALUE_DISPLAY


@admin.register(Block)
class BlockAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "author",
        "type",
    )
    search_fields = ("id",)
    empty_value_display = settings.ADMIN_EMPTY_VALUE_DISPLAY


@admin.register(PageBlockRelation)
class PageBlockRelationAdmin(admin.ModelAdmin):
    list_display = (
        "page",
        "block",
        "order",
    )
    empty_value_display = settings.ADMIN_EMPTY_VALUE_DISPLAY


@admin.register(SectionBlockRelation)
class SectionBlockRelationAdmin(admin.ModelAdmin):
    list_display = (
        "section",
        "block",
        "order",
    )
    empty_value_display = settings.ADMIN_EMPTY_VALUE_DISPLAY


@admin.register(PricingPlan)
class PricingPlanAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "slug",
        "title",
    )
    search_fields = (
        "slug",
        "title",
    )
    empty_value_display = settings.ADMIN_EMPTY_VALUE_DISPLAY


@admin.register(Text)
class TextAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "text",
    )
    search_fields = ("text",)
    empty_value_display = settings.ADMIN_EMPTY_VALUE_DISPLAY


@admin.register(AvatarBlock)
class AvatarBlockAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "dimension",
    )
    search_fields = ("dimension",)
    empty_value_display = settings.ADMIN_EMPTY_VALUE_DISPLAY


@admin.register(Button)
class ButtonAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "label",
        "description",
        "kind",
        "value",
        "type",
    )
    search_fields = ("label",)
    empty_value_display = settings.ADMIN_EMPTY_VALUE_DISPLAY


@admin.register(ButtonType)
class ButtonTypeAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "slug",
        "pricingPlan",
    )
    search_fields = ("slug",)
    empty_value_display = settings.ADMIN_EMPTY_VALUE_DISPLAY


@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "label",
        "background",
    )
    search_fields = (
        "label",
        "background",
    )
    empty_value_display = settings.ADMIN_EMPTY_VALUE_DISPLAY


@admin.register(ListBlock)
class ListBlockAdmin(admin.ModelAdmin):
    list_display = ("id",)
    # search_fields = (
    #     "label",
    #     "background",
    # )
    empty_value_display = settings.ADMIN_EMPTY_VALUE_DISPLAY


@admin.register(ListItemBlock)
class ListItemBlockAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "description",
    )
    search_fields = (
        "title",
        "description",
    )
    empty_value_display = settings.ADMIN_EMPTY_VALUE_DISPLAY


@admin.register(ListItemBlockRelation)
class ListItemBlockRelationAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "list",
        "item",
        "order",
    )
    empty_value_display = settings.ADMIN_EMPTY_VALUE_DISPLAY


@admin.register(CollapsedListBlock)
class CollapsedListBlockAdmin(admin.ModelAdmin):
    list_display = ("id",)
    empty_value_display = settings.ADMIN_EMPTY_VALUE_DISPLAY


@admin.register(CollapsedListItemBlock)
class CollapsedListItemBlockAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "title",
        "description",
    )
    search_fields = (
        "title",
        "description",
    )
    empty_value_display = settings.ADMIN_EMPTY_VALUE_DISPLAY


@admin.register(CollapsedListItemBlockRelation)
class CollapsedListItemBlockRelationAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "list",
        "item",
        "order",
    )
    empty_value_display = settings.ADMIN_EMPTY_VALUE_DISPLAY
