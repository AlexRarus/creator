from api.models.pricing_plan import PricingPlan
from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.template.defaultfilters import slugify
from unidecode import unidecode

User = get_user_model()


class TemplateType(models.Model):
    slug = models.SlugField(
        verbose_name="Слаг типа шаблона",
        max_length=255,
        blank=True,
        unique=True,
        default="default",
    )
    pricingPlan = models.ForeignKey(
        PricingPlan,
        on_delete=models.SET_NULL,
        verbose_name="Тарифный план",
        related_name="template_types",
        null=True,
    )
    order = models.PositiveIntegerField(
        verbose_name="Позиция в сортировке списка",
        null=True,
    )

    def __str__(self):
        return f"{self.slug or 'default'}"

    class Meta:
        verbose_name = "Тип шаблона"
        verbose_name_plural = "Типы шаблонов"
        ordering = (
            "order",
            "id",
        )


class Template(models.Model):
    type = models.ForeignKey(
        TemplateType,
        verbose_name="Тип",
        related_name="templates",
        on_delete=models.CASCADE,
        null=True,
    )
    label = models.CharField(
        max_length=35,
        verbose_name="Наименование",
        null=False,
        blank=False,
    )
    slug = models.SlugField(
        max_length=80,
        verbose_name="Строковый идентификатор",
        null=True,
    )
    author = models.ForeignKey(
        User,
        verbose_name="Автор",
        related_name="templates",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    blocks = models.ManyToManyField(
        "api.Block",
        verbose_name="Блоки",
        related_name="templates",
        through="api.TemplateBlockRelation",
    )
    theme = models.ForeignKey(
        "api.Theme",
        verbose_name="Тема",
        related_name="templates",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    def delete(self, *args, **kwargs):
        for block in self.blocks.filter(templates=self):
            # делаем так что бы у КАЖДОГО блока вызвался
            # собственный метод удаления
            block.delete()

        return super(self.__class__, self).delete(*args, **kwargs)

    def __str__(self):
        return f"{self.id}"

    class Meta:
        verbose_name = "Шаблон"
        verbose_name_plural = "Шаблоны"
        ordering = ("id",)
        constraints = [
            models.UniqueConstraint(
                fields=("slug", "author"),
                name="author_slug_constraint_template",
            )
        ]


@receiver(pre_save, sender=Template)
def set_slug(sender, instance, **kwargs):
    if not instance.slug:
        counter = 1
        start_slug = slugify(unidecode(instance.label))
        slug = f"{start_slug or instance.id}"
        while Template.objects.filter(author=instance.author, slug=slug):
            counter += 1
            slug = f"{start_slug}_{counter}"
        instance.slug = slug
