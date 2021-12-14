from django.contrib.auth import get_user_model
from django.db import models

from .block_type import BlockType

User = get_user_model()


class Image(models.Model):
    author = models.ForeignKey(
        User,
        related_name="images",
        verbose_name="Автор",
        on_delete=models.SET_NULL,
        null=True,
    )
    file = models.ImageField(
        verbose_name="Файл",
        help_text="Выберите файл",
        upload_to="images/%Y/%m/%d/",
        blank=True,
        null=True,
    )
    block_type = models.ForeignKey(
        BlockType,
        related_name="images",
        verbose_name="Тип блока для которого предназначена картинка",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    common = models.BooleanField(
        default=False,
        verbose_name="Общая картинка",
        null=True,
        blank=True,
    )

    def __str__(self):
        return f"Картинка загруженная пользователем {self.author.email}"

    class Meta:
        verbose_name = "Картинка"
        verbose_name_plural = "Картинки"
        ordering = ("id",)
