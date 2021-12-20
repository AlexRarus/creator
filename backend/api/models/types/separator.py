from django.db import models

from ..image import Image


class Separator(models.Model):
    value = models.CharField(verbose_name="Размер отступа", max_length=255)
    kind = models.CharField(verbose_name="Тип разделителя", max_length=255)
    isWide = models.BooleanField(verbose_name="На всю ширину", default=False)
    isTransparent = models.BooleanField(
        verbose_name="С прозрачными краями", default=False
    )
    icon = models.ForeignKey(
        Image,
        related_name="separators",
        verbose_name="Иконка",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    def __str__(self):
        return f"{self.id} - {self.value}"

    class Meta:
        verbose_name = "[Контент Блока] Разделитель"
        verbose_name_plural = "[Контент Блока] Разделитель"
        ordering = ("id",)
