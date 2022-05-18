# Generated by Django 3.2.8 on 2022-05-15 12:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0060_auto_20220505_1416"),
    ]

    operations = [
        migrations.AddField(
            model_name="page",
            name="description",
            field=models.CharField(
                blank=True,
                max_length=100,
                null=True,
                verbose_name="Описание страницы (SEO)",
            ),
        ),
        migrations.AddField(
            model_name="page",
            name="title",
            field=models.CharField(
                blank=True,
                max_length=100,
                null=True,
                verbose_name="Заголовок страницы (SEO)",
            ),
        ),
    ]