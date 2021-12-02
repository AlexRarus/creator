# Generated by Django 3.2.8 on 2021-12-01 14:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0010_auto_20211130_0718"),
    ]

    operations = [
        migrations.RenameField(
            model_name="avatar",
            old_name="border_radius",
            new_name="borderRadius",
        ),
        migrations.AddField(
            model_name="avatar",
            name="scale",
            field=models.FloatField(
                blank=True, null=True, verbose_name="Увеличение"
            ),
        ),
    ]