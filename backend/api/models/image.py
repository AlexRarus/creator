import uuid

from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


def get_upload_path(image, filename):
    user_id = int(image.author.id)
    dir_size = 1000
    dir_from_ids = user_id // dir_size * dir_size
    dir_to_ids = dir_from_ids + dir_size - 1
    dir_name = f"{dir_from_ids}-{dir_to_ids}"
    return "/".join(
        ["images", dir_name, f"{user_id}", f"{uuid.uuid4()}_{filename}"]
    )


class Image(models.Model):
    search = models.TextField(
        verbose_name="Список слов для поиска картинки",
        blank=True,
        null=True,
    )
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
    block_types = models.ManyToManyField(
        "api.BlockType",
        related_name="images",
        verbose_name="Типы блоков для которых предназначена картинка",
    )
    is_common = models.BooleanField(
        default=False,
        verbose_name="Общая картинка",
        null=True,
        blank=True,
    )
    tags = models.ManyToManyField(
        "api.ImageTag",
        verbose_name="Теги",
        related_name="images",
        blank=True,
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
    borderX = models.FloatField(
        verbose_name="Горизонтальный бордер для редактора",
        blank=True,
        null=True,
    )
    borderY = models.FloatField(
        verbose_name="Вертикальный бордер для редактора",
        blank=True,
        null=True,
    )
    scale = models.FloatField(
        verbose_name="Увеличение",
        blank=True,
        null=True,
    )

    def __str__(self):
        return f"Картинка загруженная пользователем {self.author.email}"

    class Meta:
        verbose_name = "Картинка"
        verbose_name_plural = "Картинки"
        ordering = ("id",)


class ImageTag(models.Model):
    slug = models.SlugField(
        max_length=80,
        verbose_name="Слаг тега",
        null=False,
        blank=False,
    )

    def __str__(self):
        return f"{self.slug}"

    class Meta:
        verbose_name = "Тег для картинок"
        verbose_name_plural = "Теги для картинок"
        ordering = ("id",)
