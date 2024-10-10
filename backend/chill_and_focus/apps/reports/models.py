from django.db import models

# Create your models here.
class Report(models.Model):
    class Meta:
        app_label = 'reports'
        
    id = models.AutoField(primary_key=True)
    content = models.TextField()
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    category = models.ForeignKey('ReportCategory', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True)
    is_deleted = models.BooleanField(default=False)



class ReportCategory(models.Model):
    class Meta:
        app_label = 'reports'
        
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)
    level = models.IntegerField()
    search_fields = ['name']

class ReportVote(models.Model):
    class Meta:
        app_label = 'reports'
        unique_together = ('user', 'report')
        
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    report = models.ForeignKey(Report, on_delete=models.CASCADE)
    is_upvote = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True)
    search_fields = ['user', 'report']

class ReportComment(models.Model):
    class Meta:
        app_label = 'reports'

    id = models.AutoField(primary_key=True)
    content = models.TextField()
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    report = models.ForeignKey(Report, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True)
    is_deleted = models.BooleanField(default=False)