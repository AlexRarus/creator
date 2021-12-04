from api.models.pricing_plan import PricingPlan
from django.db import models


class ButtonType(models.Model):
    SLUG_CHOICES = (
        ("web", "web"),
        ("phone", "phone"),
        ("email", "email"),
    )
    slug = models.SlugField(
        verbose_name="Действие",
        choices=SLUG_CHOICES,
        max_length=50,
        unique=True,
    )
    pricingPlan = models.ForeignKey(
        PricingPlan,
        on_delete=models.SET_NULL,
        verbose_name="Тарифный план",
        related_name="button_types",
        null=True,
    )

    def __str__(self):
        return self.slug

    class Meta:
        verbose_name = "Тип кнопки"
        verbose_name_plural = "Типы кнопок"
        ordering = ("id",)


class Button(models.Model):
    label = models.CharField(
        verbose_name="Заголовок",
        max_length=50,
    )
    description = models.CharField(
        verbose_name="Описание", max_length=50, null=True, blank=True
    )
    type = models.ForeignKey(
        ButtonType,
        on_delete=models.CASCADE,
        verbose_name="Тип кнопки",
        related_name="buttons",
    )
    value = models.TextField(verbose_name="Значение кнопки", max_length=1000)

    def __str__(self):
        return self.label[:20]

    class Meta:
        verbose_name = "[Контент Блока] Кнопка"
        verbose_name_plural = "[Контент Блока] Кнопка"
        ordering = ("id",)
