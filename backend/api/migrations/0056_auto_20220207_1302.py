# Generated by Django 3.2.8 on 2022-02-07 13:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0055_auto_20220207_1241"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="theme",
            name="animationRepeat",
        ),
        migrations.AlterField(
            model_name="theme",
            name="animationPosition",
            field=models.CharField(
                blank=True,
                max_length=255,
                null=True,
                verbose_name="Позиция анимации",
            ),
        ),
        migrations.AlterField(
            model_name="theme",
            name="animationSize",
            field=models.CharField(
                blank=True,
                max_length=255,
                null=True,
                verbose_name="Размер анимации",
            ),
        ),
    ]
