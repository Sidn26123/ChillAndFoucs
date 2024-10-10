from django.urls import path,include

from .views import (
    CreateRoomView,
    JoinRoomView,
    LeaveRoomView,
    SendMessage,
    FetchMessageView,
    DeleteRoomView,
    KickUserOutRoomView,
)

urlpatterns = [
    path('create-room', CreateRoomView.as_view(), name = 'create-room'),
    path('join-room', JoinRoomView.as_view(), name = 'join-room'),
    path('leave-room', LeaveRoomView.as_view(), name = 'leave-room'),
    path('send-message', SendMessage.as_view(), name = 'send-message'),
    path('fetch-message', FetchMessageView.as_view(), name = 'fetch-message'),
    path('delete-room', DeleteRoomView.as_view(), name = 'delete-room'),
    path('kick-user', KickUserOutRoomView.as_view(), name = 'kick-user'),
]
