from django.db import models


class Text(models.Model):
    text = models.TextField(verbose_name='Текст')

    def __str__(self):
        return self.text[:20]

    class Meta:
        verbose_name = 'Текст (тип блока)'
        verbose_name_plural = 'Текст (тип блока)'
        ordering = ('id',)
