# Generated by Django 5.0.7 on 2024-09-20 14:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('spaces', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='space',
            old_name='uri',
            new_name='url',
        ),
        migrations.RemoveField(
            model_name='space',
            name='thumbnail',
        ),
    ]
