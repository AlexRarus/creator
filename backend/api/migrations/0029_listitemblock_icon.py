# Generated by Django 3.2.8 on 2021-12-14 09:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0028_auto_20211213_1313"),
    ]

    operations = [
        migrations.AddField(
            model_name="listitemblock",
            name="icon",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="list_items",
                to="api.image",
                verbose_name="Иконка",
            ),
        ),
    ]
