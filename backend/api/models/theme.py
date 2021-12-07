from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Theme(models.Model):
    author = models.ForeignKey(
        User,
        verbose_name="Автор",
        related_name="themes",
        on_delete=models.CASCADE,
    )
    label = models.CharField(
        verbose_name="Наименование темы",
        null=True,
        blank=True,
        max_length=255,
        default="label",
    )
    slug = models.SlugField(
        verbose_name="Код темы",
        blank=True,
        max_length=255,
        unique=True,
    )
    background_primary = models.CharField(
        verbose_name="Цвет фона основной",
        null=True,
        blank=True,
        max_length=255,
        default="white",
    )
    background_secondary = models.CharField(
        verbose_name="Цвет фона второстепенный",
        null=True,
        blank=True,
        max_length=255,
        default="white",
    )
    color = models.CharField(
        verbose_name="Цвет текста",
        null=True,
        blank=True,
        max_length=255,
        default="black",
    )
    headerColor = models.CharField(
        verbose_name="Цвет заголовков",
        null=True,
        blank=True,
        max_length=255,
        default="black",
    )

    def __str__(self):
        return self.slug

    class Meta:
        verbose_name = "Тема"
        verbose_name_plural = "Темы"
