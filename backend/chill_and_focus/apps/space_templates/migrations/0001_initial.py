# Generated by Django 5.0.7 on 2024-09-13 11:25

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Template',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=50)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_deleted', models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name='TemplateSoundDetail',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('volume', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='TemplateSpaceDetail',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('uri', models.CharField(max_length=50)),
                ('order', models.IntegerField()),
            ],
        ),
    ]
