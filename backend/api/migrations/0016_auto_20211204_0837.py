# Generated by Django 3.2.8 on 2021-12-04 08:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0015_auto_20211203_1457"),
    ]

    operations = [
        migrations.CreateModel(
            name="PageBlockRelation",
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
                    "block",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="api.block",
                        verbose_name="блок",
                    ),
                ),
            ],
            options={
                "verbose_name": "Связь блока со страницей",
                "verbose_name_plural": "Связи блоков со страницами",
                "ordering": ("order",),
            },
        ),
        migrations.RemoveField(
            model_name="section",
            name="author",
        ),
        migrations.RemoveField(
            model_name="section",
            name="blocks",
        ),
        migrations.RemoveField(
            model_name="sectionblockrelation",
            name="block",
        ),
        migrations.RemoveField(
            model_name="sectionblockrelation",
            name="section",
        ),
        migrations.RemoveField(
            model_name="page",
            name="sections",
        ),
        migrations.DeleteModel(
            name="PageSectionRelation",
        ),
        migrations.DeleteModel(
            name="Section",
        ),
        migrations.DeleteModel(
            name="SectionBlockRelation",
        ),
        migrations.AddField(
            model_name="pageblockrelation",
            name="page",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="api.page",
                verbose_name="страница",
            ),
        ),
        migrations.AddField(
            model_name="page",
            name="blocks",
            field=models.ManyToManyField(
                related_name="pages",
                through="api.PageBlockRelation",
                to="api.Block",
                verbose_name="Блоки>",
            ),
        ),
        migrations.AddConstraint(
            model_name="pageblockrelation",
            constraint=models.UniqueConstraint(
                fields=("block", "page"), name="page_block_relation"
            ),
        ),
    ]