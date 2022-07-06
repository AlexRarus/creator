# Generated by Django 3.2.8 on 2022-06-23 10:11

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0061_auto_20220515_1231"),
    ]

    operations = [
        migrations.CreateModel(
            name="TemplateType",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "slug",
                    models.SlugField(
                        blank=True,
                        default="default",
                        max_length=255,
                        unique=True,
                        verbose_name="Слаг типа шаблона",
                    ),
                ),
                (
                    "order",
                    models.PositiveIntegerField(
                        null=True, verbose_name="Позиция в сортировке списка"
                    ),
                ),
                (
                    "pricingPlan",
                    models.ForeignKey(
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="template_types",
                        to="api.pricingplan",
                        verbose_name="Тарифный план",
                    ),
                ),
            ],
            options={
                "verbose_name": "Тип шаблона",
                "verbose_name_plural": "Типы шаблонов",
                "ordering": ("order", "id"),
            },
        ),
        migrations.AddField(
            model_name="template",
            name="type",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="templates",
                to="api.templatetype",
                verbose_name="Тип",
            ),
        ),
    ]
