from django.conf.urls import url
from django.urls import include, path
from .views import LogoutView, LogoutAllView

urlpatterns = [
    url("v1/auth/", include("djoser.urls")),
    url("v1/auth/", include("djoser.urls.jwt")),
    path('v1/auth/logout/', LogoutView.as_view(), name='auth_logout'),
    path(
        'v1/auth/logout_all/',
        LogoutAllView.as_view(),
        name='auth_logout_all'
    )
]
