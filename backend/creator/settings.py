import json
import os
from datetime import timedelta

import environ

from .utils import LOCAL_MACHINE_IP

env = environ.Env(
    DEVELOP=(bool, False),
    DEBUG=(bool, False),
    SECRET_KEY=(str, "SUP3R-S3CR3T-K3Y-F0R-MY-PR0J3CT"),
    ALLOWED_HOSTS=(str, f'["localhost", "127.0.0.1", "{LOCAL_MACHINE_IP}"]'),
    DB_ENGINE=(str, "django.db.backends.postgresql"),
    DB_NAME=(str, "postgres"),
    POSTGRES_USER=(str, "postgres"),
    POSTGRES_PASSWORD=(str, "postgres"),
    DB_HOST=(str, "db"),
    DB_PORT=(str, "5432"),
    EMAIL_HOST_USER=(str, "someuser@gmail.com"),
    EMAIL_HOST_PASSWORD=(str, "password"),
    PUBLIC_URL=(str, "http://localhost/"),
    AWS_STORAGE_BUCKET_NAME=(str, "AWS_STORAGE_BUCKET_NAME"),
    AWS_S3_ACCESS_KEY_ID=(str, "AWS_S3_ACCESS_KEY_ID"),
    AWS_S3_SECRET_ACCESS_KEY=(str, "AWS_S3_SECRET_ACCESS_KEY"),
    SSL_ENABLED=(bool, False),
    YANDEX_S3_BUCKET_NAME=(str, "YANDEX_S3_BUCKET_NAME"),
    YANDEX_S3_ACCESS_KEY_ID=(str, "YANDEX_S3_ACCESS_KEY_ID"),
    YANDEX_S3_SECRET_ACCESS_KEY=(str, "YANDEX_S3_SECRET_ACCESS_KEY"),
)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# reading .env file
env.read_env(os.path.join(BASE_DIR, ".env"))

DEVELOP = env("DEVELOP")

SECRET_KEY = env("SECRET_KEY")
DEBUG = env("DEVELOP") or env("DEBUG")
ALLOWED_HOSTS = json.loads(env("ALLOWED_HOSTS"))

INTERNAL_IPS = [
    "127.0.0.1",
]

CORS_ALLOWED_ORIGINS = [
    "http://localhost:8080",
]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "debug_toolbar",
    "corsheaders",
    "storages",
    "rest_framework_simplejwt.token_blacklist",
    "rest_framework",
    "django_filters",
    "djoser",
    "users",
    "api",
    "django_cleanup",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "debug_toolbar.middleware.DebugToolbarMiddleware",
    "debug_toolbar_force.middleware.ForceDebugToolbarMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
]

ROOT_URLCONF = "creator.urls"

TEMPLATES_DIR = os.path.join(BASE_DIR, "templates")
TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [TEMPLATES_DIR],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "creator.wsgi.application"

DATABASES = {
    "default": {
        "ENGINE": env("DB_ENGINE"),
        "NAME": env("DB_NAME"),
        "USER": env("POSTGRES_USER"),
        "PASSWORD": env("POSTGRES_PASSWORD"),
        "HOST": LOCAL_MACHINE_IP if DEVELOP else env("DB_HOST"),
        "PORT": env("DB_PORT"),
    }
}

AUTH_PASSWORD_VALIDATORS = [
    # {
    #     "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    # },
    # {
    #     "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    # },
    # {
    #     "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    # },
    # {
    #     "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    # },
]

LANGUAGE_CODE = "ru-RU"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True

AUTH_USER_MODEL = "users.CustomUser"

STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "static")

MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media")


REST_FRAMEWORK = {
    # "DEFAULT_RENDERER_CLASSES": ("rest_framework.renderers.JSONRenderer",),
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        # "rest_framework.authentication.SessionAuthentication",
    ],
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
    ],
    "DEFAULT_PAGINATION_CLASS": "api.pagination.CustomPagination",
    "PAGE_SIZE": 20,  # если убрать то ВСЕ запросы СПИСКОВ должны иметь limit
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(days=30),
    "TOKEN_REFRESH_LIFETIME": timedelta(days=45),
}

DJOSER = {
    "LOGIN_FIELD": "email",
    "SEND_ACTIVATION_EMAIL": False,
    "ACTIVATION_URL": env("PUBLIC_URL")
    + "auth/registration-confirm/{uid}/{token}/",
    "PASSWORD_RESET_CONFIRM_URL": env("PUBLIC_URL")
    + "auth/reset-password-confirm/{uid}/{token}/",
    "EMAIL": {
        "password_reset": "users.email.PasswordReset",
        "activation": "users.email.ActivationEmail",
    },
    "SERIALIZERS": {
        "user": "users.serializers.UserSerializer",
        "current_user": "users.serializers.UserSerializer",
    },
}

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USER = env("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = env("EMAIL_HOST_PASSWORD")

ADMIN_EMPTY_VALUE_DISPLAY = "-пусто-"

# ----Yandex s3----
DEFAULT_FILE_STORAGE = "yandex_s3_storage.ClientDocsStorage"
YANDEX_S3_BUCKET_NAME = env("YANDEX_S3_BUCKET_NAME")
AWS_ACCESS_KEY_ID = env("YANDEX_S3_ACCESS_KEY_ID")
AWS_SECRET_ACCESS_KEY = env("YANDEX_S3_SECRET_ACCESS_KEY")
AWS_S3_ENDPOINT_URL = "https://storage.yandexcloud.net"
AWS_S3_REGION_NAME = "storage"

SECURE_PROXY_SSL_HEADER = (
    "HTTP_X_FORWARDED_PROTO",
    "https" if env("SSL_ENABLED") else "http",
)
SECURE_SSL_REDIRECT = env("SSL_ENABLED")
SESSION_COOKIE_SECURE = env("SSL_ENABLED")
CSRF_COOKIE_SECURE = env("SSL_ENABLED")
