# Generated by Django 3.2.8 on 2021-12-20 09:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0037_auto_20211220_0835"),
    ]

    operations = [
        migrations.AddField(
            model_name="section",
            name="backgroundImage",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="sections",
                to="api.image",
                verbose_name="Фоновое изображение",
            ),
        ),
        migrations.AlterField(
            model_name="theme",
            name="backgroundImage",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="themes",
                to="api.image",
                verbose_name="Фоновое изображение",
            ),
        ),
    ]
