from rest_framework import serializers
from .models import Room, RoomMessage
from apps.users.serializers import UserSerializer

class RoomSerializer(serializers.ModelSerializer):
    online_users = UserSerializer(many=True)
    class Meta:
        model = Room
        fields = '__all__'


class RoomMessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer()
    class Meta:
        model = RoomMessage
        fields = '__all__'