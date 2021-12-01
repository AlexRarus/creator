from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Avatar(models.Model):
    user = models.OneToOneField(
        User,
        related_name="avatar",
        verbose_name="Пользователь",
        on_delete=models.CASCADE,
    )
    file = models.ImageField(
        verbose_name="Файл",
        help_text="Выберите файл",
        upload_to="avatars/%Y/%m/%d/",
        blank=True,
        null=True,
    )
    x = models.FloatField(
        verbose_name="Позиция X",
        blank=True,
        null=True,
    )
    y = models.FloatField(
        verbose_name="Позиция Y",
        blank=True,
        null=True,
    )
    width = models.FloatField(
        verbose_name="Ширина",
        blank=True,
        null=True,
    )
    height = models.FloatField(
        verbose_name="Высота",
        blank=True,
        null=True,
    )
    border_radius = models.FloatField(
        verbose_name="Скругление углов",
        blank=True,
        null=True,
    )
    rotate = models.FloatField(
        verbose_name="Угол вращения в градусах",
        blank=True,
        null=True,
    )

    def __str__(self):
        return f"Аватар пользователя {self.user.email}"

    class Meta:
        verbose_name = "Аватар"
        verbose_name_plural = "Аватарки"
        ordering = ("id",)
