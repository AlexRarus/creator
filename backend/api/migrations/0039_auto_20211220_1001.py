# Generated by Django 3.2.8 on 2021-12-20 10:01

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0038_auto_20211220_0916"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="buttontype",
            name="icon",
        ),
        migrations.AddField(
            model_name="button",
            name="icon",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="buttons",
                to="api.image",
                verbose_name="Иконка",
            ),
        ),
    ]
