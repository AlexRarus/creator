from django.contrib.auth import get_user_model
from django.db import models

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

    def __str__(self):
        return f"Картинка загруженная пользователем {self.author.email}"

    class Meta:
        verbose_name = "Картинка"
        verbose_name_plural = "Картинки"
        ordering = ("id",)
