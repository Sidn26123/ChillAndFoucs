from django.db import models
from apps.spaces.models import Space
from apps.sounds.models import Sound
from apps.users.models import User
# Create your models here.
class Template(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_deleted = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class TemplateSpaceDetail(models.Model):
    id = models.AutoField(primary_key=True)
    template = models.ForeignKey(Template, on_delete=models.CASCADE)
    uri = models.CharField(max_length=50)
    space = models.ForeignKey(Space, on_delete=models.CASCADE)
    order = models.IntegerField()

class TemplateSoundDetail(models.Model):
    id = models.AutoField(primary_key=True)
    template = models.ForeignKey(Template, on_delete=models.CASCADE)
    sound = models.ForeignKey(Sound, on_delete=models.CASCADE)
    volume = models.IntegerField()