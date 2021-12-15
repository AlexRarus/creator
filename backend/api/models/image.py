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
    )

    def __str__(self):
        return f"Картинка загруженная пользователем {self.author.email}"

    class Meta:
        verbose_name = "Картинка"
        verbose_name_plural = "Картинки"
        ordering = ("id",)


class ImageTag(models.Model):
    label = models.CharField(
        max_length=35,
        verbose_name="Наименование",
        null=False,
        blank=False,
    )
    slug = models.SlugField(
        max_length=80,
        verbose_name="Строковый идентификатор",
        null=False,
        blank=False,
    )

    def __str__(self):
        return f"{self.label} ({self.slug})"

    class Meta:
        verbose_name = "Тег для поиска картинок"
        verbose_name_plural = "Теги для поиска картинок"
        ordering = ("id",)
