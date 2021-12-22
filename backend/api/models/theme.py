from api.models.image import Image
from api.models.pricing_plan import PricingPlan
from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.template.defaultfilters import slugify
from unidecode import unidecode

User = get_user_model()


class ThemeType(models.Model):
    slug = models.SlugField(
        verbose_name="Слаг типа темы",
        max_length=255,
        blank=True,
        unique=True,
        default="",
    )
    pricingPlan = models.ForeignKey(
        PricingPlan,
        on_delete=models.SET_NULL,
        verbose_name="Тарифный план",
        related_name="theme_types",
        null=True,
    )
    order = models.PositiveIntegerField(
        verbose_name="Позиция в сортировке списка",
        null=True,
    )

    def __str__(self):
        return f"{self.slug or 'default'}"

    class Meta:
        verbose_name = "Тип тем"
        verbose_name_plural = "Типы тем"
        ordering = (
            "order",
            "id",
        )


class Theme(models.Model):
    author = models.ForeignKey(
        User,
        verbose_name="Автор",
        related_name="themes",
        on_delete=models.CASCADE,
    )
    type = models.ForeignKey(
        ThemeType,
        verbose_name="Тип",
        related_name="themes",
        on_delete=models.CASCADE,
        null=True,
    )
    label = models.CharField(
        verbose_name="Наименование темы",
        null=True,
        blank=True,
        max_length=255,
        default="my_theme",
    )
    slug = models.SlugField(
        verbose_name="Код темы",
        max_length=255,
        blank=True,
        unique=True,
    )
    background = models.CharField(
        verbose_name="Цвет фона",
        null=True,
        blank=True,
        max_length=255,
        default="white",
    )
    backgroundImage = models.ForeignKey(
        Image,
        verbose_name="Фоновое изображение",
        related_name="themes",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )
    color = models.CharField(
        verbose_name="Цвет текста",
        null=True,
        blank=True,
        max_length=255,
        default="black",
    )
    headerColor = models.CharField(
        verbose_name="Цвет заголовков",
        null=True,
        blank=True,
        max_length=255,
        default="black",
    )

    def __str__(self):
        return self.slug

    class Meta:
        verbose_name = "Тема"
        verbose_name_plural = "Темы"


@receiver(pre_save, sender=Theme)
def set_slug(sender, instance, **kwargs):
    if not instance.slug:
        counter = 1
        slug_label = slugify(unidecode(instance.label))
        slug = f"{slug_label or instance.id}"
        while Theme.objects.filter(slug=slug):
            counter += 1
            slug = f"{slug_label}_{counter}"
        instance.slug = slug
