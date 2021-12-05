import uuid

from django.contrib.auth import get_user_model
from django.db import models

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
    backgroundFile = models.ImageField(
        verbose_name="Исходный Файл",
        help_text="Выберите файл",
        upload_to=get_upload_path,
        blank=True,
        null=True,
    )
    background = models.CharField(
        verbose_name="Цвет фона",
        max_length=255,
        null=True,
        blank=True,
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
