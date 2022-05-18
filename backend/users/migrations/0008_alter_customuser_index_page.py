# Generated by Django 3.2.8 on 2022-05-16 09:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0061_auto_20220515_1231"),
        ("users", "0007_customuser_index_page"),
    ]

    operations = [
        migrations.AlterField(
            model_name="customuser",
            name="index_page",
            field=models.ForeignKey(
                blank=True,
                default=None,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="index_users",
                to="api.page",
                verbose_name="Индексная страница",
            ),
        ),
    ]