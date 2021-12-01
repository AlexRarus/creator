from django.conf import settings
from django.contrib import admin

from .models.avatar import Avatar
from .models.block import Block
from .models.block_type import BlockType
from .models.image import Image
from .models.page import Page
from .models.relations import PageBlockRelation
from .models.section import Section
from .models.types.text import Text


@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = (
        "author",
        "file",
    )
    search_fields = (
        "id",
        "author",
        "file",
    )
    empty_value_display = settings.ADMIN_EMPTY_VALUE_DISPLAY


@admin.register(Avatar)
class AvatarAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "user",
        "file",
        "x",
        "y",
        "width",
        "height",
        "border_radius",
        "rotate",
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


@admin.register(BlockType)
class BlockTypeAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "author",
        "slug",
        "label",
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
        "section",
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


@admin.register(Section)
class SectionAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "author",
        "name",
    )
    search_fields = ("name",)
    empty_value_display = settings.ADMIN_EMPTY_VALUE_DISPLAY


@admin.register(Text)
class TextAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "text",
    )
    search_fields = ("text",)
    empty_value_display = settings.ADMIN_EMPTY_VALUE_DISPLAY
