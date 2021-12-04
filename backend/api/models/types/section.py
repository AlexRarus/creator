from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


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
    background = models.CharField(
        verbose_name="Цвет фона", max_length=255, null=True, blank=True
    )

    def __str__(self):
        return f"{self.id} - {self.label}"

    class Meta:
        verbose_name = "[Контент Блока] Секция"
        verbose_name_plural = "[Контент Блока] Секция"
        ordering = ("id",)
