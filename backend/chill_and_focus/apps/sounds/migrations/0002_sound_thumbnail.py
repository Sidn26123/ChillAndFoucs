# Generated by Django 5.0.7 on 2024-09-25 07:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sounds', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='sound',
            name='thumbnail',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
