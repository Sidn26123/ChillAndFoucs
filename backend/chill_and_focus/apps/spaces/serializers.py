from rest_framework import serializers
from .models import Space, SpaceCategory
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView



class SpaceCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SpaceCategory
        fields = '__all__'

class SpaceSerializer(serializers.ModelSerializer):
    category = SpaceCategorySerializer()
    class Meta:
        model = Space
        fields = ('id', 'name', 'url', 'category')

# class FileSerializer()