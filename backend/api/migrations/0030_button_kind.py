# Generated by Django 3.2.8 on 2021-12-14 15:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0029_listitemblock_icon"),
    ]

    operations = [
        migrations.AddField(
            model_name="button",
            name="kind",
            field=models.CharField(
                blank=True,
                max_length=50,
                null=True,
                verbose_name="Тип отображения",
            ),
        ),
    ]