from django.db import models

# Create your models here.
class Room(models.Model):
    uni_key = models.CharField(max_length=12, unique=True)
    time_start = models.DateTimeField()
    password = models.CharField(max_length=255)
    is_locked = models.BooleanField(default=False)
    is_private = models.BooleanField(default=True)
    creator = models.ForeignKey('users.User', on_delete=models.CASCADE)
    
