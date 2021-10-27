from django.conf.urls import url
from django.urls import include

urlpatterns = [
    url("auth/", include("djoser.urls")),
    url("auth/", include("djoser.urls.jwt")),
]
