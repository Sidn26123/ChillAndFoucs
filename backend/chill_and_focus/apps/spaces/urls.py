from django.contrib import admin
from django.urls import path,include

from .views import (
    AddSpaceView,
    GetSpaceView,
    UpdateSpaceView,
    DeleteSpaceView,
    AddSpaceCategoryView,
    GetSpaceCategoryView,
    UpdateSpaceCategoryView,
    DeleteSpaceCategoryView,
    GetSpaceByCategoryView
)
urlpatterns = [
    path('add-space', AddSpaceView.as_view(), name = 'add-space'),
    path('get-space', GetSpaceView.as_view(), name = 'get-space'),
    path('update-space', UpdateSpaceView.as_view(), name = 'update-space'),
    path('delete-space/<int:space_id>', DeleteSpaceView.as_view(), name = 'delete-space'),
    path('add-space-category', AddSpaceCategoryView.as_view(), name = 'add-space-category'),
    path('get-space-category', GetSpaceCategoryView.as_view(), name = 'get-space-category'),
    path('update-space-category', UpdateSpaceCategoryView.as_view(), name = 'update-space-category'),
    path('delete-space-category/<int:category_id>', DeleteSpaceCategoryView.as_view(), name = 'delete-space-category'),
    path('spaces/<int:category_id>', GetSpaceByCategoryView.as_view(), name = 'get-space-by-category'),
]