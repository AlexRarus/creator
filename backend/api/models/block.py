from django.contrib.auth import get_user_model
from django.db import models

from .section import Section
from .types.text import Text

User = get_user_model()


class Block(models.Model):
    author = models.ForeignKey(
        User,
        verbose_name="Автор",
        related_name="blocks",
        on_delete=models.CASCADE,
    )
    type = models.CharField(max_length=255, verbose_name="Тип блока")
    section = models.ForeignKey(
        Section,
        related_name="blocks",
        verbose_name="Секция",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    text = models.ForeignKey(
        Text,
        verbose_name='Контент блока с типом "text"',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    def __str__(self):
        return f"{self.id} - {self.type}"

    class Meta:
        verbose_name = "Блок"
        verbose_name_plural = "Блоки"
        ordering = ("id",)
