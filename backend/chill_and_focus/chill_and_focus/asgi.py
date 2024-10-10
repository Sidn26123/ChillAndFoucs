"""
ASGI config for chill_and_focus project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

# import os

# from django.core.asgi import get_asgi_application

# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chill_and_focus.settings')

# application = get_asgi_application()
import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from apps.chats.routing import websocket_urlpatterns
from apps.chats.consumer import ChatConsumer 
from django.urls import path

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'chill_and_focus.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": 
        URLRouter(
            [
                path('ws/chat/<str:room_name>/', ChatConsumer.as_asgi()),
            ]
        )
})
