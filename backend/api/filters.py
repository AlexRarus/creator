import django_filters
from api.models.image import Image
from api.models.theme import Theme
from rest_framework import filters


class ImageFilter(django_filters.FilterSet):
    tags = django_filters.CharFilter(field_name="tags", method="filter_tags")
    block_types = django_filters.CharFilter(
        field_name="block_types", method="filter_block_type"
    )

    class Meta:
        model = Image
        fields = (
            "tags__slug",
            "block_types__slug",
        )

    def filter_tags(self, queryset, name, tags):
        return queryset.filter(tags__slug__in=tags.split(","))

    def filter_block_type(self, queryset, name, block_types):
        return queryset.filter(block_types__slug__in=block_types.split(","))


class ImageSearchFilter(filters.SearchFilter):
    search_param = "search"


class ThemeFilter(django_filters.FilterSet):
    type = django_filters.CharFilter(field_name="type", method="filter_type")

    class Meta:
        model = Theme
        fields = ("type__slug",)

    def filter_type(self, queryset, name, type):
        return queryset.filter(type__slug=type)
