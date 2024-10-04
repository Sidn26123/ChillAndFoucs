import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'

        # Tham gia nhóm chat
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        print(self.channel_name)

        await self.accept()

    async def disconnect(self, close_code):
        # Rời nhóm chat
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    # Nhận message từ WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Gửi message tới nhóm chat
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )
        # pass
    # Nhận message từ nhóm chat
    async def chat_message(self, event):
        message = event['message']

        # Gửi message tới WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))


class ScreenSharingConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'chat_{self.room_name}'
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # Nhận tin nhắn signaling từ WebSocket
    async def receive(self, text_data):
        data = json.loads(text_data)

        # Gửi tin signaling đến các thành viên khác
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'send_sdp',
                'message': data
            }
        )

    # Gửi tin signaling đến WebSocket
    async def send_sdp(self, event):
        message = event['message']
        await self.send(text_data=json.dumps(message))