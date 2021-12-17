from django.db import models


class CollapsedListBlock(models.Model):
    items = models.ManyToManyField(
        "api.CollapsedListItemBlock",
        verbose_name="Элементы",
        related_name="lists",
        through="api.CollapsedListItemBlockRelation",
    )

    def __str__(self):
        block = self.block
        return f"data_id = {self.id} in " f"block_id = {block}"

    class Meta:
        verbose_name = "[Контент Блока] Вопрос Ответ"
        verbose_name_plural = "[Контент Блока] Вопрос Ответ"
        ordering = ("id",)


class CollapsedListItemBlock(models.Model):
    title = models.CharField(
        verbose_name="Заголовок", max_length=255, blank=True, null=True
    )
    description = models.TextField(
        verbose_name="Описание", max_length=1500, blank=True, null=True
    )

    def __str__(self):
        return f"{self.id} - {self.title[:30]}"

    class Meta:
        verbose_name = "[Контент Блока] Вопрос Ответ (элемент списка)"
        verbose_name_plural = "[Контент Блока] Вопрос Ответ (элемент списка)"
        ordering = ("id",)


class CollapsedListItemBlockRelation(models.Model):
    item = models.ForeignKey(
        "api.CollapsedListItemBlock",
        verbose_name="Элемент",
        on_delete=models.CASCADE,
    )
    list = models.ForeignKey(
        "api.CollapsedListBlock",
        verbose_name="Список",
        on_delete=models.CASCADE,
    )
    order = models.PositiveIntegerField(
        default=0,
    )

    class Meta:
        verbose_name = "Связь списка с элементом (тип блока Вопрос Ответ)"
        verbose_name_plural = (
            "Связи списков с элементами (тип блока Вопрос Ответ)"
        )
        ordering = ("order",)
        constraints = [
            models.UniqueConstraint(
                fields=("item", "list"),
                name="collapsed_list_item_block_relation",
            )
        ]
