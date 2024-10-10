from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from apps.spaces.models import Space
from .models import FavoriteSpace
from .serializers import FavoriteSpaceSerializer


# Create your views here.
class GetUserFovoriteSpace(APIView):
	permissions_class = [IsAuthenticated]

	def get(self, request):
		user = request.user
		try:
			favorites = FavoriteSpace.objects.filter(user = user)
			favorites_serializer = FavoriteSpaceSerializer(favorites, many = True)
			return Response({'message': 'Lấy dữ liệu thành công', 'favorites': favorites_serializer.data}, status = 200)

		except:
			return Response({'message': 'Có lỗi xảy ra'}, status = 500)


from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

class FavoriteSpace(APIView):
    permission_classes = [IsAuthenticated]  # Chú ý sửa thành `permission_classes`

    def post(self, request):
        user = request.user
        try:
            data = request.data
            space_id = data.get('space_id')
            if not space_id:
                return Response({"error": "space_id is required"}, status=status.HTTP_400_BAD_REQUEST)
            
            # Lấy đối tượng Space, trả về 404 nếu không tồn tại
            space = get_object_or_404(Space, id=space_id)

            # Kiểm tra xem mục yêu thích đã tồn tại hay chưa
            fav, created = FavoriteSpace.objects.get_or_create(user=user, space=space)

            if created:
                return Response({"message": "Space added to favorites successfully"}, status=status.HTTP_201_CREATED)
            else:
                # Nếu đã tồn tại, có thể thêm hành động khác, như xoá khỏi danh sách yêu thích
                fav.delete()
                return Response({"message": "Space removed from favorites"}, status=status.HTTP_200_OK)

        except Space.DoesNotExist:
            return Response({"error": "Space not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
