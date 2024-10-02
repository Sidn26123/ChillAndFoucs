from django.contrib import admin
from django.urls import path,include

from .views import (
    GetSoundsView
)
urlpatterns = [
    path('get-sounds', GetSoundsView.as_view(), name = 'get-sounds'),
]