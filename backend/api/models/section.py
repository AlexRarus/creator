from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class Section(models.Model):
    author = models.ForeignKey(
        User,
        verbose_name="Автор",
        related_name="sections",
        on_delete=models.CASCADE,
    )
    name = models.CharField(max_length=255, verbose_name="Наименование")

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Секция"
        verbose_name_plural = "Секции"
        ordering = ("id",)
