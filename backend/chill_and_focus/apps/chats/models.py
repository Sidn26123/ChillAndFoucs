from django.db import models

# Create your models here.
class Chat(models.Model):
    id = models.AutoField(primary_key=True)
    sender = models.ForeignKey('apps.users.User', on_delete=models.CASCADE, related_name='sender')
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_recall = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(null=True, blank=True)