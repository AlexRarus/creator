# Generated by Django 3.2.8 on 2021-12-17 09:31

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0035_auto_20211216_1149"),
    ]

    operations = [
        migrations.CreateModel(
            name="CollapsedListBlock",
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
            ],
            options={
                "verbose_name": "[Контент Блока] Вопрос Ответ",
                "verbose_name_plural": "[Контент Блока] Вопрос Ответ",
                "ordering": ("id",),
            },
        ),
        migrations.CreateModel(
            name="CollapsedListItemBlock",
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
                    "title",
                    models.CharField(
                        blank=True,
                        max_length=255,
                        null=True,
                        verbose_name="Заголовок",
                    ),
                ),
                (
                    "description",
                    models.TextField(
                        blank=True,
                        max_length=1500,
                        null=True,
                        verbose_name="Описание",
                    ),
                ),
            ],
            options={
                "verbose_name": "[Контент Блока] Вопрос Ответ (элемент списка)",
                "verbose_name_plural": "[Контент Блока] Вопрос Ответ (элемент списка)",
                "ordering": ("id",),
            },
        ),
        migrations.AlterField(
            model_name="blocktype",
            name="slug",
            field=models.SlugField(
                choices=[
                    ("text", "text"),
                    ("button", "button"),
                    ("section", "section"),
                    ("avatar", "avatar"),
                    ("list", "list"),
                    ("collapsed_list", "collapsed_list"),
                    ("separator", "separator"),
                ],
                unique=True,
                verbose_name="slug",
            ),
        ),
        migrations.CreateModel(
            name="CollapsedListItemBlockRelation",
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
                ("order", models.PositiveIntegerField(default=0)),
                (
                    "item",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="api.collapsedlistitemblock",
                        verbose_name="Элемент",
                    ),
                ),
                (
                    "list",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="api.collapsedlistblock",
                        verbose_name="Список",
                    ),
                ),
            ],
            options={
                "verbose_name": "Связь списка с элементом (тип блока Вопрос Ответ)",
                "verbose_name_plural": "Связи списков с элементами (тип блока Вопрос Ответ)",
                "ordering": ("order",),
            },
        ),
        migrations.AddField(
            model_name="collapsedlistblock",
            name="items",
            field=models.ManyToManyField(
                related_name="lists",
                through="api.CollapsedListItemBlockRelation",
                to="api.CollapsedListItemBlock",
                verbose_name="Элементы",
            ),
        ),
        migrations.AddField(
            model_name="block",
            name="collapsed_list",
            field=models.OneToOneField(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="block",
                to="api.collapsedlistblock",
                verbose_name='Контент блока с типом "collapsed_list"',
            ),
        ),
        migrations.AddConstraint(
            model_name="collapsedlistitemblockrelation",
            constraint=models.UniqueConstraint(
                fields=("item", "list"),
                name="collapsed_list_item_block_relation",
            ),
        ),
    ]
