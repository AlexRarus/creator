# Generated by Django 3.2.8 on 2021-11-29 08:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0007_auto_20211129_0833"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="avatar",
            options={
                "ordering": ("id",),
                "verbose_name": "Аватар",
                "verbose_name_plural": "Аватарки",
            },
        ),
        migrations.AlterField(
            model_name="avatar",
            name="border_radius",
            field=models.FloatField(
                blank=True, null=True, verbose_name="Скругление углов"
            ),
        ),
        migrations.AlterField(
            model_name="avatar",
            name="height",
            field=models.FloatField(
                blank=True, null=True, verbose_name="Высота"
            ),
        ),
        migrations.AlterField(
            model_name="avatar",
            name="rotate",
            field=models.FloatField(
                blank=True, null=True, verbose_name="Угол вращения в градусах"
            ),
        ),
        migrations.AlterField(
            model_name="avatar",
            name="width",
            field=models.FloatField(
                blank=True, null=True, verbose_name="Ширина"
            ),
        ),
        migrations.AlterField(
            model_name="avatar",
            name="x",
            field=models.FloatField(
                blank=True, null=True, verbose_name="Позиция X"
            ),
        ),
        migrations.AlterField(
            model_name="avatar",
            name="y",
            field=models.FloatField(
                blank=True, null=True, verbose_name="Позиция Y"
            ),
        ),
    ]
