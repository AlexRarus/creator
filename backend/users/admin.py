from django.conf import settings
from django.contrib import admin
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.token_blacklist.models import OutstandingToken

User = get_user_model()


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "email",
        "username",
        "theme",
    )
    empty_value_display = settings.ADMIN_EMPTY_VALUE_DISPLAY

    def be_aware_no_warning_clear_tokens_and_delete(self, request, queryset):
        users = queryset.values("id")
        OutstandingToken.objects.filter(user__id__in=users).delete()
        queryset.delete()

    actions = ["be_aware_no_warning_clear_tokens_and_delete"]
