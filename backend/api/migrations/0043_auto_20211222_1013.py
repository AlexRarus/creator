# Generated by Django 3.2.8 on 2021-12-22 10:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0042_auto_20211222_0827"),
    ]

    operations = [
        migrations.AddField(
            model_name="theme",
            name="buttonBackground",
            field=models.CharField(
                blank=True,
                max_length=255,
                null=True,
                verbose_name="Цвет заливки кнопки",
            ),
        ),
        migrations.AddField(
            model_name="theme",
            name="buttonColor",
            field=models.CharField(
                blank=True,
                max_length=255,
                null=True,
                verbose_name="Цвет текста кнопки",
            ),
        ),
        migrations.AddField(
            model_name="theme",
            name="buttonKind",
            field=models.CharField(
                blank=True,
                max_length=255,
                null=True,
                verbose_name="Тип кнопок",
            ),
        ),
    ]
