from django.db import models
from apps.users.models import User
# Create your models here.
class FocusClock(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    time_start = models.DateTimeField()
    time_end = models.DateTimeField()
    amount = models.IntegerField()