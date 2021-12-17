from api.models.pricing_plan import PricingPlan
from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class BlockType(models.Model):
    SLUG_CHOICES = (
        ("text", "text"),
        ("button", "button"),
        ("section", "section"),
        ("avatar", "avatar"),
        ("list", "list"),
        ("collapsed_list", "collapsed_list"),
        ("separator", "separator"),
    )
    author = models.ForeignKey(
        User,
        verbose_name="Автор",
        related_name="block_types",
        on_delete=models.CASCADE,
    )
    label = models.CharField(
        max_length=255,
        verbose_name="Наименование",
    )
    slug = models.SlugField(
        verbose_name="slug",
        unique=True,
        null=False,
        choices=SLUG_CHOICES,
    )
    pricingPlan = models.ForeignKey(
        PricingPlan,
        on_delete=models.SET_NULL,
        verbose_name="Тарифный план",
        related_name="block_types",
        null=True,
    )
    in_list = models.BooleanField(
        verbose_name="Получать этот тип при запросе списка типов",
        default=True,
    )

    def __str__(self):
        return f"{self.slug}"

    class Meta:
        verbose_name = "Тип блока"
        verbose_name_plural = "Типы блоков"
        ordering = ("id",)
