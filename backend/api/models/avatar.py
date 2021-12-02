from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


def get_upload_path(avatar, filename):
    user_id = int(avatar.user.id)
    dir_size = 1000
    dir_from_ids = user_id // dir_size * dir_size
    dir_to_ids = dir_from_ids + dir_size - 1
    dir_name = f"{dir_from_ids}-{dir_to_ids}"
    return "/".join(["avatars", dir_name, f"{user_id}", filename])


class Avatar(models.Model):
    user = models.OneToOneField(
        User,
        related_name="avatar",
        verbose_name="Пользователь",
        on_delete=models.CASCADE,
    )
    sourceFile = models.ImageField(
        verbose_name="Исходный Файл",
        help_text="Выберите файл",
        upload_to=get_upload_path,
        blank=True,
        null=True,
    )
    previewFile = models.ImageField(
        verbose_name="Файл для предпросмотра",
        help_text="Выберите файл",
        upload_to=get_upload_path,
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
    borderRadius = models.FloatField(
        verbose_name="Скругление углов",
        blank=True,
        null=True,
    )
    rotate = models.FloatField(
        verbose_name="Угол вращения в градусах",
        blank=True,
        null=True,
    )
    scale = models.FloatField(
        verbose_name="Увеличение",
        blank=True,
        null=True,
    )

    def __str__(self):
        return f"Аватар пользователя {self.user.email}"

    class Meta:
        verbose_name = "Аватар"
        verbose_name_plural = "Аватарки"
        ordering = ("id",)
