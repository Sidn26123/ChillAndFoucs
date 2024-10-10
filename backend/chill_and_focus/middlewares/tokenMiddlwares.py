from urllib.parse import parse_qs
from channels.middleware import BaseMiddleware
from django.contrib.auth.models import AnonymousUser
from rest_framework_simplejwt.tokens import AccessToken
from channels.db import database_sync_to_async
from apps.users.models import User
@database_sync_to_async
def get_user(token):
    try:
        valid_data = AccessToken(token)
        user = User.objects.get(id=valid_data['user_id'])
        return user
    except Exception:
        return AnonymousUser()

class TokenAuthMiddleware(BaseMiddleware):
    async def __call__(self, scope, receive, send):
        # Lấy token từ query string
        query_string = parse_qs(scope['query_string'].decode())
        token = query_string.get('token')

        if token:
            scope['user'] = await get_user(token[0])
        else:
            scope['user'] = AnonymousUser()

        return await super().__call__(scope, receive, send)

