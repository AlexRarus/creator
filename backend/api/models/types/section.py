import uuid

from django.contrib.auth import get_user_model
from django.db import models

from ..image import Image

User = get_user_model()


def get_upload_path(section, filename):
    author_id = int(section.block.author.id)
    dir_size = 1000
    dir_from_ids = author_id // dir_size * dir_size
    dir_to_ids = dir_from_ids + dir_size - 1
    dir_name = f"{dir_from_ids}-{dir_to_ids}"
    return "/".join(
        [
            "section_backgrounds",
            dir_name,
            f"{author_id}",
            f"{uuid.uuid4()}_{filename}",
        ]
    )


class Section(models.Model):
    label = models.CharField(
        verbose_name="Наименование", max_length=255, null=True, blank=True
    )
    blocks = models.ManyToManyField(
        "api.Block",
        verbose_name="Блоки",
        related_name="sections",
        through="api.SectionBlockRelation",
    )
    backgroundType = models.CharField(
        verbose_name="Тип фона",
        null=True,
        blank=True,
        max_length=255,
        default="color",
    )
    backgroundColor = models.CharField(
        verbose_name="Цвет фона",
        null=True,
        blank=True,
        max_length=255,
        default="white",
    )
    backgroundGradient = models.CharField(
        verbose_name="Градиент фона",
        null=True,
        blank=True,
        max_length=255,
        default="linear-gradient(to bottom, #FFFFFF, #FFFFFF)",
    )
    backgroundImage = models.ForeignKey(
        Image,
        verbose_name="Фоновое изображение",
        related_name="sections",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    backgroundRepeat = models.BooleanField(
        verbose_name="Зацикливать изображение",
        default=False,
    )
    backgroundSmooth = models.BooleanField(
        verbose_name="Плавный переход",
        default=False,
    )
    backgroundParallax = models.BooleanField(
        verbose_name="Параллакс",
        default=False,
    )
    color = models.CharField(
        verbose_name="Цвет текста",
        null=True,
        blank=True,
        max_length=255,
    )
    borderRadius = models.CharField(
        verbose_name="Скругление углов",
        max_length=255,
        null=True,
        blank=True,
    )
    paddingTop = models.CharField(
        verbose_name="Отступ сверху",
        max_length=255,
        null=True,
        blank=True,
    )
    paddingBottom = models.CharField(
        verbose_name="Отступ снизу",
        max_length=255,
        null=True,
        blank=True,
    )
    paddingRight = models.CharField(
        verbose_name="Отступ справа",
        max_length=255,
        null=True,
        blank=True,
    )
    paddingLeft = models.CharField(
        verbose_name="Отступ слева",
        max_length=255,
        null=True,
        blank=True,
    )

    def __str__(self):
        return f"{self.id} - {self.label}"

    class Meta:
        verbose_name = "[Контент Блока] Секция"
        verbose_name_plural = "[Контент Блока] Секция"
        ordering = ("id",)
