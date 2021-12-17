from django.contrib.auth import get_user_model
from django.db import models

from .block_type import BlockType
from .types.avatar import AvatarBlock
from .types.button import Button
from .types.collapsed_list import CollapsedListBlock
from .types.list import ListBlock
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
    list = models.OneToOneField(
        ListBlock,
        verbose_name='Контент блока с типом "list"',
        related_name="block",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    collapsed_list = models.OneToOneField(
        CollapsedListBlock,
        verbose_name='Контент блока с типом "collapsed_list"',
        related_name="block",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )

    def delete(self, *args, **kwargs):
        if self.type.slug == "text" and self.text is not None:
            self.text.delete()
        elif self.type.slug == "button" and self.button is not None:
            self.button.delete()
        elif self.type.slug == "section" and self.section is not None:
            self.section.delete()
        elif self.type.slug == "avatar" and self.avatar is not None:
            self.avatar.delete()
        elif self.type.slug == "list" and self.list is not None:
            self.list.items.filter(lists=self.list).delete()
            self.list.delete()
        elif (
            self.type.slug == "collapsed_list"
            and self.collapsed_list is not None
        ):
            self.collapsed_list.items.filter(
                lists=self.collapsed_list
            ).delete()
            self.collapsed_list.delete()

        return super(self.__class__, self).delete(*args, **kwargs)

    def __str__(self):
        return f"{self.id} - {self.type}"

    class Meta:
        verbose_name = "Блок"
        verbose_name_plural = "Блоки"
        ordering = ("id",)
