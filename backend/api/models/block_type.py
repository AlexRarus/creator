from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class BlockType(models.Model):
    author = models.ForeignKey(
        User,
        verbose_name="Автор",
        related_name="block_types",
        on_delete=models.CASCADE,
    )
    label = models.CharField(
        max_length=255,
        verbose_name="Наименование",
    )
    slug = models.SlugField(
        verbose_name="slug",
        null=False,
    )

    def __str__(self):
        return f"{self.slug}"

    class Meta:
        verbose_name = "Тип блока"
        verbose_name_plural = "Типы блоков"
        ordering = ("id",)
