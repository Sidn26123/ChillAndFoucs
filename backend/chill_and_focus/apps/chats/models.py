from django.db import models

# Create your models here.
class RoomMessage(models.Model):
    sender = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='sender')
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_recall = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    deleted_at = models.DateTimeField(null=True, blank=True)
    room = models.ForeignKey('Room', on_delete=models.CASCADE)

class Room(models.Model):
    name = models.CharField(max_length=12, unique=True)
    author = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='author', null=True)
    online_users = models.ManyToManyField('users.User', related_name='online_users', blank = True)
    def __str__(self):
        return self.name