# Generated by Django 3.2.8 on 2022-02-07 12:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0054_auto_20220207_1116"),
    ]

    operations = [
        migrations.AddField(
            model_name="theme",
            name="animationRepeat",
            field=models.BooleanField(
                blank=True,
                default=False,
                null=True,
                verbose_name="Размножить по вертикали?",
            ),
        ),
        migrations.AlterField(
            model_name="theme",
            name="animationPosition",
            field=models.CharField(
                blank=True,
                default="top",
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
                default="auto",
                max_length=255,
                null=True,
                verbose_name="Размер анимации",
            ),
        ),
    ]
