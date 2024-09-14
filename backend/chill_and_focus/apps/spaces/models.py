from django.db import models

# Create your models here.
class Space(models.Model):
    class Meta:
        app_label = 'spaces'
        
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    thumbnail = models.CharField(max_length=255)
    uri = models.CharField(max_length=255)
    category = models.ForeignKey('SpaceCategory', on_delete=models.CASCADE)
    search_fields = ['name']


class SpaceCategory(models.Model):
    class Meta:
        app_label = 'spaces'
        
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)
    search_fields = ['name']

