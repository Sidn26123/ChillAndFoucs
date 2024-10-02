from rest_framework import serializers
from .models import Sound, SoundCategory

class SoundCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SoundCategory
        fields = '__all__'

class SoundSerializer(serializers.ModelSerializer):
    category = SoundCategorySerializer()
    class Meta:
        model = Sound
        fields = ('id', 'name', 'uri', 'thumbnail', 'category')