from django.contrib.auth import get_user_model
from django.db import models

from .block_type import BlockType
from .section import Section
from .types.button import Button
from .types.text import Text

User = get_user_model()


class Block(models.Model):
    author = models.ForeignKey(
        User,
        verbose_name="Автор",
        related_name="blocks",
        on_delete=models.CASCADE,
    )
    type = models.ForeignKey(
        BlockType,
        related_name="blocks",
        verbose_name="Тип блока",
        on_delete=models.SET_NULL,
        null=True,
    )
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
    button = models.ForeignKey(
        Button,
        verbose_name='Контент блока с типом "button"',
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
