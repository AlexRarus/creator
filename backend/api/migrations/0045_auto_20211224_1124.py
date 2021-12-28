# Generated by Django 3.2.8 on 2021-12-24 11:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0044_auto_20211223_1310"),
    ]

    operations = [
        migrations.RenameField(
            model_name="theme",
            old_name="background",
            new_name="backgroundColor",
        ),
        migrations.RemoveField(
            model_name="section",
            name="background",
        ),
        migrations.AddField(
            model_name="section",
            name="backgroundColor",
            field=models.CharField(
                blank=True,
                default="white",
                max_length=255,
                null=True,
                verbose_name="Цвет фона",
            ),
        ),
        migrations.AddField(
            model_name="section",
            name="backgroundGradient",
            field=models.CharField(
                blank=True,
                default="linear-gradient(to bottom, #FFFFFF, #FFFFFF)",
                max_length=255,
                null=True,
                verbose_name="Градиент фона",
            ),
        ),
        migrations.AddField(
            model_name="section",
            name="backgroundParallax",
            field=models.BooleanField(default=False, verbose_name="Параллакс"),
        ),
        migrations.AddField(
            model_name="section",
            name="backgroundRepeat",
            field=models.BooleanField(
                default=False, verbose_name="Зацикливать изображение"
            ),
        ),
        migrations.AddField(
            model_name="section",
            name="backgroundSmooth",
            field=models.BooleanField(
                default=False, verbose_name="Плавный переход"
            ),
        ),
        migrations.AddField(
            model_name="section",
            name="backgroundType",
            field=models.CharField(
                blank=True,
                default="color",
                max_length=255,
                null=True,
                verbose_name="Тип фона",
            ),
        ),
        migrations.AddField(
            model_name="theme",
            name="backgroundGradient",
            field=models.CharField(
                blank=True,
                default="linear-gradient(to bottom, #FFFFFF, #FFFFFF)",
                max_length=255,
                null=True,
                verbose_name="Градиент фона",
            ),
        ),
        migrations.AddField(
            model_name="theme",
            name="backgroundRepeat",
            field=models.BooleanField(
                default=False, verbose_name="Зацикливать изображение"
            ),
        ),
        migrations.AddField(
            model_name="theme",
            name="backgroundSmooth",
            field=models.BooleanField(
                default=False, verbose_name="Плавный переход"
            ),
        ),
        migrations.AddField(
            model_name="theme",
            name="backgroundType",
            field=models.CharField(
                blank=True,
                default="color",
                max_length=255,
                null=True,
                verbose_name="Тип фона",
            ),
        ),
    ]