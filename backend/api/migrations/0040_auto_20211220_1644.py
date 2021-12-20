# Generated by Django 3.2.8 on 2021-12-20 16:44

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0039_auto_20211220_1001"),
    ]

    operations = [
        migrations.CreateModel(
            name="Separator",
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
                    "value",
                    models.CharField(
                        max_length=255, verbose_name="Размер отступа"
                    ),
                ),
                (
                    "kind",
                    models.CharField(
                        max_length=255, verbose_name="Тип разделителя"
                    ),
                ),
                (
                    "isWide",
                    models.BooleanField(
                        default=False, verbose_name="На всю ширину"
                    ),
                ),
                (
                    "isTransparent",
                    models.BooleanField(
                        default=False, verbose_name="С прозрачными краями"
                    ),
                ),
                (
                    "icon",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="separators",
                        to="api.image",
                        verbose_name="Иконка",
                    ),
                ),
            ],
            options={
                "verbose_name": "[Контент Блока] Разделитель",
                "verbose_name_plural": "[Контент Блока] Разделитель",
                "ordering": ("id",),
            },
        ),
        migrations.AddField(
            model_name="block",
            name="separator",
            field=models.OneToOneField(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="block",
                to="api.separator",
                verbose_name='Контент блока с типом "separator"',
            ),
        ),
    ]
