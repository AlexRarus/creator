# Generated by Django 3.2.8 on 2021-11-06 12:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_customuser_username'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='username',
            field=models.SlugField(blank=True, max_length=254, null=True, unique=True),
        ),
    ]