from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Room, RoomMessage
from django.db import IntegrityError
from .serializers import RoomSerializer, RoomMessageSerializer
from apps.users.models import User
# Create your views here.
class CreateRoomView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        data = request.data
        room_name = data.get('room_name', None)
        print("R: ", room_name)
        if not room_name:
            return Response({'message': 'Tên phòng không hợp lệ hoặc thiếu'}, status = 400)
        try: 
            room = Room.objects.create(name=room_name, author = request.user)
        except IntegrityError:
            return Response({'message': 'Tên phòng đã tồn tại'}, status = 400)
        
        return Response({'message': 'Tạo phòng thành công'}, status = 200)

class JoinRoomView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        data = request.data
        room_name = data.get('room_name', None)
        if not room_name:
            return Response({'message': 'Tên phòng không hợp lệ hoặc thiếu'}, status = 400)
        try:
            room = Room.objects.get(name=room_name)
            user = request.user
            room.online_users.add(user)
        except Room.DoesNotExist:
            return Response({'message': 'Phòng không tồn tại'}, status = 400)
        room_serializer = RoomSerializer(room)
        return Response({'message': 'Tham gia phòng thành công', 'data':room_serializer.data}, status = 200)
    
class LeaveRoomView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        data = request.data
        room_name = data.get('room_name', None)
        if not room_name:
            return Response({'message': 'Tên phòng không hợp lệ hoặc thiếu'}, status = 400)
        try:
            room = Room.objects.get(name=room_name)
            user = request.user
            room.online_users.remove(user)
        except Room.DoesNotExist:
            return Response({'message': 'Phòng không tồn tại'}, status = 400)
        room_serializer = RoomSerializer(room)
        return Response({'message': 'Rời phòng thành công', 'data':room_serializer.data}, status = 200)
    
class SendMessage(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        data = request.data
        room_name = data.get('room_name', None)
        message = data.get('message', None)
        if not room_name or not message:
            return Response({'message': 'Dữ liệu không hợp lệ hoặc thiếu'}, status = 400)
        try:
            room = Room.objects.get(name=room_name)
            user = request.user
            room_message = RoomMessage.objects.create(sender=user, message=message, room=room)
        except Room.DoesNotExist:
            return Response({'message': 'Phòng không tồn tại'}, status = 400)
        room_message_serializer = RoomMessageSerializer(room_message)
        return Response({'message': 'Gửi tin nhắn thành công', 'data': room_message_serializer.data}, status = 200)

class DeleteRoomMessage(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        data = request.data
        message_id = data.get('message_id', None)
        if not message_id:
            return Response({'message': 'ID tin nhắn không hợp lệ hoặc thiếu'}, status = 400)
        try:
            room_message = RoomMessage.objects.get(id=message_id)
            room_message.is_deleted = True
            room_message.save()
        except RoomMessage.DoesNotExist:
            return Response({'message': 'Tin nhắn không tồn tại'}, status = 400)
        return Response({'message': 'Xóa tin nhắn thành công'}, status = 200)
        
        
class FetchMessageView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        data = request.data
        room_name = data.get('room_name', None)
        if not room_name:
            return Response({'message': 'Tên phòng không hợp lệ hoặc thiếu'}, status = 400)
        try:
            room = Room.objects.get(name=room_name)
            messages = RoomMessage.objects.filter(room=room, is_deleted=False)
            messages_serializer = RoomMessageSerializer(messages, many=True)
        except Room.DoesNotExist:
            return Response({'message': 'Phòng không tồn tại'}, status = 400)
        return Response({'message': 'Lấy tin nhắn thành công', 'data': messages_serializer.data}, status = 200)
class DeleteRoomView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        data = request.data
        room_name = data.get('room_name', None)
        print("Ro: ", room_name)
        if not room_name:
            return Response({'message': 'Tên phòng không hợp lệ hoặc thiếu'}, status = 400)
        
            
        try:
            room = Room.objects.get(name=room_name)
            print("Ro: ", room, "ủe: ", request.user)
            if room.author != request.user:
                return Response({'message': 'Bạn không phải là chủ phòng'}, status = 400)
            room.delete()
        except Room.DoesNotExist:
            return Response({'message': 'Phòng không tồn tại'}, status = 400)
        return Response({'message': 'Xóa phòng thành công'}, status = 200)
    
class KickUserOutRoomView(APIView):
    permission_classes = [IsAuthenticated]
    def post(self, request):
        data = request.data
        room_name = data.get('room_name', None)
        user_id = data.get('user_id', None)
        if not room_name or not user_id:
            return Response({'message': 'Dữ liệu không hợp lệ hoặc thiếu'}, status = 400)
        try:
            room = Room.objects.get(name=room_name)
            user = User.objects.get(id=user_id)
            room.online_users.remove(user)
        except Room.DoesNotExist:
            return Response({'message': 'Phòng không tồn tại'}, status = 400)
        except User.DoesNotExist:
            return Response({'message': 'Người dùng không tồn tại'}, status = 400)
        room_serializer = RoomSerializer(room)
        return Response({'message': 'Đuổi người dùng khỏi phòng thành công', 'data':room_serializer.data}, status = 200)