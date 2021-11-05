from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import pre_save
from django.dispatch import receiver
import uuid


User = get_user_model()


class Page(models.Model):
    slug = models.SlugField(
        verbose_name='Идентификатор',
        unique=True,
        null=True,
    )
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


@receiver(pre_save, sender=Page)
def set_slug(sender, instance, **kwargs):
    if not instance.slug:
        slug = uuid.uuid4().hex[:30]
        while Page.objects.filter(slug=slug):
            slug = uuid.uuid4().hex[:30]
        instance.slug = slug
