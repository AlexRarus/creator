# Generated by Django 3.2.8 on 2021-12-23 13:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0043_auto_20211222_1013"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="theme",
            options={
                "ordering": ("id",),
                "verbose_name": "Тема",
                "verbose_name_plural": "Темы",
            },
        ),
        migrations.RemoveField(
            model_name="section",
            name="backgroundFile",
        ),
    ]