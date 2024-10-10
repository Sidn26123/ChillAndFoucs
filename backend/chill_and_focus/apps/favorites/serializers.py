from rest_framework import serializers
from .models import FavoriteSpace
from spaces.models import Space
from users.models import User
from users.serializers import UserSerializer
from spaces.serializers import SpaceSerializer

class FavoriteSpaceSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    space = SpaceSerializer()
    class Meta:
        model = FavoriteSpace
        fields = '__all__'