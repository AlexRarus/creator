from django.db import models
from django.contrib.auth import get_user_model


User = get_user_model()


class Page(models.Model):
    author = models.ForeignKey(
        User,
        verbose_name='Автор',
        related_name='pages',
        on_delete=models.CASCADE,
    )
    blocks = models.ManyToManyField(
        'api.Block',
        related_name='Блоки',
        verbose_name='pages',
        through='api.PageBlockRelation',
    )

    def __str__(self):
        return f'{self.id}'

    class Meta:
        verbose_name = 'Страница'
        verbose_name_plural = 'Страницы'
        ordering = ('id',)
