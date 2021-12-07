from django.db import models


class PageBlockRelation(models.Model):
    block = models.ForeignKey(
        "api.Block",
        verbose_name="блок",
        on_delete=models.CASCADE,
    )
    page = models.ForeignKey(
        "api.Page",
        verbose_name="страница",
        on_delete=models.CASCADE,
    )
    order = models.PositiveIntegerField(
        default=0,
    )

    class Meta:
        verbose_name = "Связь блока со страницей"
        verbose_name_plural = "Связи блоков со страницами"
        ordering = ("order",)
        constraints = [
            models.UniqueConstraint(
                fields=("block", "page"),
                name="page_block_relation",
            )
        ]


class SectionBlockRelation(models.Model):
    block = models.ForeignKey(
        "api.Block",
        verbose_name="блок",
        on_delete=models.CASCADE,
    )
    section = models.ForeignKey(
        "api.Section",
        verbose_name="секция",
        on_delete=models.CASCADE,
    )
    order = models.PositiveIntegerField(
        default=0,
    )

    class Meta:
        verbose_name = "Связь блока с секцией"
        verbose_name_plural = "Связи блоков с секцией"
        ordering = ("order",)
        constraints = [
            models.UniqueConstraint(
                fields=("block", "section"),
                name="section_block_relation",
            )
        ]
