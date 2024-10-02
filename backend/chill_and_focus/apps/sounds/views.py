from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .models import SoundCategory, Sound
from .serializers import SoundSerializer, SoundCategorySerializer
import os
from django.conf import settings



class GetSoundsView(APIView):
    def get(self, request):
        sounds = Sound.objects.all()
        sound_thumbnails = []
        sound_paths = []
        for sound in sounds:
            sound_thumbnails.append({'id': sound.id, 'name': sound.name, 'thumbnail' : self.get_thumbnail(sound.thumbnail)})
            sound_paths.append({'id': sound.id, 'path': self.get_sound_path(sound.uri)})
        sounds_serializer = SoundSerializer(sounds, many = True)
        return Response({'sounds': sounds_serializer.data, 'thumbnails': sound_thumbnails, 'paths': sound_paths}, status = 200)
    
    def get_thumbnail(self, name):
        if not name:
            name = 'call.jpg'
        return os.path.join(settings.MEDIA_URL, 'server/thumbnail/sounds/', name)
    
    def get_sound_path(self, uri):
        return os.path.join(settings.MEDIA_URL, 'server/sounds/', uri)
