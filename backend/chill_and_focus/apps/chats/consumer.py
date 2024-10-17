import json
from channels.generic.websocket import AsyncWebsocketConsumer

ROOM_GROUP_NAME_PREFIX = 'chat'
INVITE_GROUP_NAME_PREFIX = 'invite'


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f'{ROOM_GROUP_NAME_PREFIX}_{self.room_name}'
        self.user = self.scope['user']
        # Tham gia nhóm chat
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

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
        sender = text_data_json['sender']
        # Gửi message tới nhóm chat
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'sender': sender
            }
        )
        # pass
    # Nhận message từ nhóm chat
    async def chat_message(self, event):
        message = event['message']
        sender = event['sender']
        # Gửi message tới WebSocket
        await self.send(text_data=json.dumps({
            'message': message,
            'user': sender
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

    
class InviteConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user_id = self.scope['url_route']['kwargs']['user_id']
        self.room_group_name = f'{INVITE_GROUP_NAME_PREFIX}_{self.user_id}'
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    async def receive(self, text_data=None, bytes_data=None):
        text_data_json = json.loads(text_data)
        message_type = text_data_json['type']

        if message_type == "invite":
            await self.send_invite({
                'room_name': text_data_json['room_name'],
                'sender': text_data_json['sender'],
                'receiver': text_data_json['receiver']
            })
        elif message_type == "accept":
            await self.send_accept({
                'room_name': text_data_json['room_name'],
                'receiver': text_data_json['receiver']
            })
    async def send_invite(self, event):
        room_name = event['room_name']
        sender = event['sender']
        receiver = event['receiver']
        
        await self.channel_layer.group_send(
            f'invite_{receiver}',
            {
                'type': 'send_notification',
                'room_name': room_name,
                'sender': sender,
                'receiver': receiver
            }
        )

    async def send_notification(self, event):
        room_name = event['room_name']
        sender = event['sender']
        print("room_name: ", room_name)
        await self.send(text_data=json.dumps({
            'room_name': room_name,
            'sender': sender
        }))

    async def send_accept(self, event):
        room_name = event['room_name']
        receiver = event['receiver']

        await self.channel_layer.group_send(
            f'invite_{receiver}',
            {
                'type': 'send_accept_notification',
                'room_name': room_name,
                'receiver': receiver
            }
        )

    async def send_accept_notification(self, event):
        room_name = event['room_name']
        receiver = event['receiver']
        await self.send(text_data=json.dumps({
            'room_name': room_name,
            'receiver': receiver
        }))