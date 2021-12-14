from django.db import models

from ..image import Image


class ListBlock(models.Model):
    iconSize = models.CharField(
        verbose_name="Размер иконки", max_length=15, null=True, blank=True
    )
    fontSize = models.CharField(
        verbose_name="Размер текста", max_length=15, null=True, blank=True
    )
    template = models.CharField(
        verbose_name="Шаблон", max_length=15, null=True, blank=True
    )
    items = models.ManyToManyField(
        "api.ListItemBlock",
        verbose_name="Элементы",
        related_name="lists",
        through="api.ListItemBlockRelation",
    )

    def __str__(self):
        return f"list - {self.id}"

    class Meta:
        verbose_name = "[Контент Блока] Список"
        verbose_name_plural = "[Контент Блока] Список"
        ordering = ("id",)


class ListItemBlock(models.Model):
    title = models.CharField(
        verbose_name="Заголовок", max_length=255, blank=True, null=True
    )
    description = models.CharField(
        verbose_name="Описание", max_length=255, blank=True, null=True
    )
    icon = models.ForeignKey(
        Image,
        related_name="list_items",
        verbose_name="Иконка",
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
    )

    def __str__(self):
        return f"{self.id} - {self.title[:30]}"

    class Meta:
        verbose_name = "[Контент Блока] Список (элемент списка)"
        verbose_name_plural = "[Контент Блока] Список (элемент списка)"
        ordering = ("id",)


class ListItemBlockRelation(models.Model):
    item = models.ForeignKey(
        "api.ListItemBlock",
        verbose_name="Элемент",
        on_delete=models.CASCADE,
    )
    list = models.ForeignKey(
        "api.ListBlock",
        verbose_name="Список",
        on_delete=models.CASCADE,
    )
    order = models.PositiveIntegerField(
        default=0,
    )

    class Meta:
        verbose_name = "Связь списка с элементом (тип блока Список)"
        verbose_name_plural = "Связи списков с элементами (тип блока Список)"
        ordering = ("order",)
        constraints = [
            models.UniqueConstraint(
                fields=("item", "list"),
                name="list_item_block_relation",
            )
        ]
