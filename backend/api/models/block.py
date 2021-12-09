from django.contrib.auth import get_user_model
from django.db import models

from .block_type import BlockType
from .types.avatar import AvatarBlock
from .types.button import Button
from .types.section import Section
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
    text = models.OneToOneField(
        Text,
        verbose_name='Контент блока с типом "text"',
        related_name="block",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    button = models.OneToOneField(
        Button,
        verbose_name='Контент блока с типом "button"',
        related_name="block",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    section = models.OneToOneField(
        Section,
        verbose_name='Контент блока с типом "section"',
        related_name="block",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    avatar = models.OneToOneField(
        AvatarBlock,
        verbose_name='Контент блока с типом "avatar"',
        related_name="block",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    def __str__(self):
        return f"{self.id} - {self.type}"

    class Meta:
        verbose_name = "Блок"
        verbose_name_plural = "Блоки"
        ordering = ("id",)
