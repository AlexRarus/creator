from django.contrib import admin
from django.conf import settings

from .models.page import Page
from .models.block import Block
from .models.relations import PageBlockRelation
from .models.section import Section
from .models.types.text import Text


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "author",
        # "blocks",
    )
    search_fields = ("id",)
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
