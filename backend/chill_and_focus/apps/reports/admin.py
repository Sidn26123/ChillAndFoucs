from django.contrib import admin

# Register your models here.
from .models import Report, ReportCategory, ReportComment, ReportVote

admin.site.register(Report)
admin.site.register(ReportCategory)
admin.site.register(ReportComment)
admin.site.register(ReportVote)