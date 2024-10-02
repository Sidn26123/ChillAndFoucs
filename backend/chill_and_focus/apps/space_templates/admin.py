from django.contrib import admin

# Register your models here.
from .models import Template, TemplateSoundDetail, TemplateSpaceDetail

admin.site.register(Template)
admin.site.register(TemplateSoundDetail)
admin.site.register(TemplateSpaceDetail)