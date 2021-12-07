from django.conf.urls import url
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import CustomUserViewSet, LogoutAllView, LogoutView

router = DefaultRouter()
router.register("v1/auth/users", CustomUserViewSet)

urlpatterns = router.urls

urlpatterns += [
    url("v1/auth/", include("djoser.urls.authtoken")),
    url("v1/auth/", include("djoser.urls.jwt")),
    path("v1/auth/logout/", LogoutView.as_view(), name="auth_logout"),
    path(
        "v1/auth/logout_all/", LogoutAllView.as_view(), name="auth_logout_all"
    ),
]
