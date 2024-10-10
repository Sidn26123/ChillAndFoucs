from django.db import models

# Create your models here.
class Sound(models.Model):
    class Meta:
        app_label = 'sounds'
        
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    uri = models.CharField(max_length=255, unique=True)
    category = models.ForeignKey('SoundCategory', on_delete=models.CASCADE)
    thumbnail = models.CharField(max_length=255, null=True)
    search_fields = ['name']


class SoundCategory(models.Model):
    class Meta:
        app_label = 'sounds'
        
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)
    search_fields = ['name']