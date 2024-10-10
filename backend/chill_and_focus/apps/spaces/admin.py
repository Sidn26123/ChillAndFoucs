from django.contrib import admin

# Register your models here.
from .models import Space, SpaceCategory

admin.site.register(Space)
admin.site.register(SpaceCategory)