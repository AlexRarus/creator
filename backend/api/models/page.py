from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.template.defaultfilters import slugify
from unidecode import unidecode

User = get_user_model()


class Page(models.Model):
    label = models.CharField(
        max_length=35,
        verbose_name="Наименование",
        null=False,
        blank=False,
    )
    title = models.CharField(
        max_length=100,
        verbose_name="Заголовок страницы (SEO)",
        null=True,
        blank=True,
    )
    description = models.CharField(
        max_length=100,
        verbose_name="Описание страницы (SEO)",
        null=True,
        blank=True,
    )
    slug = models.SlugField(
        max_length=80,
        verbose_name="Строковый идентификатор (задает пользователь)",
        null=True,
    )
    author = models.ForeignKey(
        User,
        verbose_name="Автор",
        related_name="pages",
        on_delete=models.CASCADE,
    )
    blocks = models.ManyToManyField(
        "api.Block",
        verbose_name="Блоки",
        related_name="pages",
        through="api.PageBlockRelation",
    )

    def delete(self, *args, **kwargs):
        for block in self.blocks.filter(pages=self):
            # делаем так что бы у КАЖДОГО блока вызвался
            # собственный метод удаления
            block.delete()

        return super(self.__class__, self).delete(*args, **kwargs)

    def __str__(self):
        return f"{self.id}"

    class Meta:
        verbose_name = "Страница"
        verbose_name_plural = "Страницы"
        ordering = ("id",)
        constraints = [
            models.UniqueConstraint(
                fields=("slug", "author"),
                name="author_slug_constraint",
            )
        ]


@receiver(pre_save, sender=Page)
def set_slug(sender, instance, **kwargs):
    if not instance.slug:
        counter = 1
        start_slug = slugify(unidecode(instance.label))
        slug = f"{start_slug or instance.id}"
        while Page.objects.filter(author=instance.author, slug=slug):
            counter += 1
            slug = f"{start_slug}_{counter}"
        instance.slug = slug
