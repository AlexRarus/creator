from django.db import models


class PricingPlan(models.Model):
    title = models.CharField(
        verbose_name="Наименование",
        max_length=255,
    )
    slug = models.SlugField(
        verbose_name="Код тарифного плана",
        max_length=50,
        unique=True,
        default="default",
    )

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Тарифный план"
        verbose_name_plural = "Тарифные планы"
        ordering = ("id",)
