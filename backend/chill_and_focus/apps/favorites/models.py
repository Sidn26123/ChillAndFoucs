from django.db import models
from apps.users.models import User
# Create your models here.
class FavoriteSpace(models.Model):
    class Meta:
        app_label = 'favorites'
        unique_together = ('user', 'space')
        
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    space = models.ForeignKey('spaces.Space', on_delete=models.CASCADE)

    search_fields = ['user', 'space']

