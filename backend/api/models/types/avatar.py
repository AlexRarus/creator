from django.db import models


class AvatarBlock(models.Model):
    dimension = models.CharField(verbose_name="Размер аватарки", max_length=50)

    def __str__(self):
        return f"{self.id} - {self.dimension}"

    class Meta:
        verbose_name = "[Контент Блока] Аватар"
        verbose_name_plural = "[Контент Блока] Аватар"
        ordering = ("id",)
