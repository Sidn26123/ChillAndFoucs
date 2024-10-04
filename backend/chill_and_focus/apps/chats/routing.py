from django.urls import path
from .consumer import ChatConsumer, ScreenSharingConsumer

websocket_urlpatterns = [
    path('ws/chat/<str:room_name>/', ChatConsumer.as_asgi()),
    path('ws/screen-share/<str:room_name>/', ScreenSharingConsumer.as_asgi()),
]
