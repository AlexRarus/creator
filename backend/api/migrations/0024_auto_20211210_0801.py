# Generated by Django 3.2.8 on 2021-12-10 08:01

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0023_auto_20211210_0729"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="block",
            name="list",
        ),
        migrations.AddField(
            model_name="listblock",
            name="block",
            field=models.OneToOneField(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.CASCADE,
                related_name="list",
                to="api.block",
                verbose_name="Блок",
            ),
        ),
    ]
