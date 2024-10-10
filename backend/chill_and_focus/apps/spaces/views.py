from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from .models import Space, SpaceCategory
from .serializers import SpaceCategorySerializer, SpaceSerializer
# Create your views here.
class AddSpaceView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    def post(self, request):
        user = request.user
        data = request.data
        url = data.get('url')
        name = data.get('name')
        category = data.get('category')
        if not url or not name or not category:
            return Response({'message': 'Invalid data'}, status = 400)
        
        try:
            space_category = SpaceCategory.objects.get(id=category)
            new_space = Space.objects.create(url = url, name = name, category = space_category)
            
            return Response({'message': 'Thêm không gian thành công'}, status = 200)
        except SpaceCategory.DoesNotExist:
            return Response({'message': 'Mục này không tồn tại'}, status = 404)


class GetSpaceView(APIView):
    def get(self, request):
        spaces = Space.objects.all()
        spaces_serializer = SpaceSerializer(spaces, many = True)
        return Response({'spaces': spaces_serializer.data}, status = 200)
    
class UpdateSpaceView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    def post(self, request):
        try:
            data = request.data
            space_id = data.get('space_id')
            name_attr_update = ['name', 'url', 'category']
            update_data = {}
            space = Space.objects.get(id = space_id)
            for attr in name_attr_update:
                if data.get(attr):
                    if attr == 'category':
                        try:
                            space_category = SpaceCategory.objects.get(name = data.get(attr))
                            update_data[attr] = space_category
                        except SpaceCategory.DoesNotExist:
                            return Response({'message': 'Mục không tồn tại'}, status = 404)
                    else:
                        update_data[attr] = data.get(attr)

            for key, value in update_data.items():
                setattr(space, key, value)

            space.save()
            return Response({'message': 'Cập nhật không gian thành công'}, status = 200)
        except Space.DoesNotExist:
            return Response({'message': 'Không tìm thấy không gian'}, status = 404)
        except:
            return Response({'message': 'Có lỗi xảy ra'}, status = 500)

class DeleteSpaceView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    def delete(self, request, space_id):
        try:
            space = Space.objects.get(id = space_id)
            space.delete()
            return Response({'message': 'Xóa không gian thành công'}, status = 200)
        except Space.DoesNotExist:
            return Response({'message': 'Không tìm thấy không gian'}, status = 404)
        except:
            return Response({'message': 'Có lỗi xảy ra'}, status = 500)

import os
from django.conf import settings
from django.db import IntegrityError
class AddSpaceCategoryView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    def post(self, request):
        try:
            data = request.data
            name = data.get('name', None)
            thumbnail = request.FILES.get('thumbnail', None)
            #Nếu thumbnail = None thì gán thumbnail = gps.png
            if not thumbnail:
                thumbnail = 'gps.png'
                thumbnail.name = 'gps.png'
            thumbnail_name = name.replace(' ', '_') + "." + thumbnail.name.split('.')[-1]

            thumbnail.name = name.replace(' ', '_') 
            upload_path = os.path.join('server/thumbnail/space_category/', thumbnail_name)
            full_path = os.path.join(settings.MEDIA_ROOT, upload_path)
            with open(full_path, 'wb+') as destination:
                for chunk in thumbnail.chunks():
                    destination.write(chunk)
            if not name:
                if os.path.exists(full_path):
                    os.remove(full_path)
                return Response({'message': 'Dữ liệu không hợp lệ'}, status = 400)

            new_category = SpaceCategory.objects.create(name = name, thumbnail = thumbnail_name)
            category_serializer = SpaceCategorySerializer(new_category)
            return Response({'message': 'Thêm mục thành công', 'data': category_serializer.data}, status = 200)
        except IntegrityError:
            if os.path.exists(full_path):
                os.remove(full_path)
            return Response({'message': 'Mục đã tồn tại'}, status = 400)
        except Exception as e:
            print(e)
            if os.path.exists(full_path):
                os.remove(full_path)
            return Response({'message': 'a'}, status = 500)
        #gau kinh di
        
            
import base64
import os
from django.http import HttpResponse
class GetSpaceCategoryView(APIView):
    # permission_classes = [IsAuthenticated]
    def get(self, request):
        try:
            categories = SpaceCategory.objects.all()
            cate_thumbnails = []
            path = "server/thumbnail/space_category/"
            for cate in categories:
                thumbnail_info = {'id': cate.id, 'content': self.get_thumbnail_path(cate.thumbnail)}
                cate_thumbnails.append(thumbnail_info)
            category_serializer = SpaceCategorySerializer(categories, many = True)
            return Response({'categories': category_serializer.data, 'thumbnail': cate_thumbnails}, status = 200)
        except Exception as e:
            print(e)
            return Response({'message': 'Có lỗi xảy ra'}, status = 500)
    def get_thumbnail_path(self, thumbnail_name):
        # upload_path = os.path.join('server/thumbnail/space_category/', thumbnail_name)
        # full_path = os.path.join(settings.MEDIA_ROOT, upload_path)
        # if (os.path.exists(full_path)):
        #     with open(full_path, 'rb') as file:
        #         file_content = file.read()
        #         encoded_thumbnail = base64.b64encode(file_content).decode('utf-8')
        #         return encoded_thumbnail
        #         # response = HttpResponse(file_content, content_type='image/png')
        #         # return response.content  # Trả về blob
        # return None
        return os.path.join(settings.MEDIA_URL, 'server/thumbnail/space_category/', thumbnail_name)

class UpdateSpaceCategoryView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    def post(self, request):
        try:
            data = request.data
            category_id = data.get('category_id')
            name = data.get('name')
            if not name:
                return Response({'message': 'Invalid data'}, status = 400)
            category = SpaceCategory.objects.get(id = category_id)
            category.name = name
            category.save()
            category_serializer = SpaceCategorySerializer(category)
            return Response({'message': 'Cập nhật mục thành công', 'data': category_serializer.data}, status = 200)
        except SpaceCategory.DoesNotExist:
            return Response({'message': 'Không tìm thấy mục'}, status = 404)
        except:
            return Response({'message': 'Có lỗi xảy ra'}, status = 500)
        
class DeleteSpaceCategoryView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    def delete(self, request, category_id):
        try:
            category = SpaceCategory.objects.get(id = category_id)
            category.delete()
            return Response({'message': 'Xóa mục thành công'}, status = 200)
        except SpaceCategory.DoesNotExist:
            return Response({'message': 'Không tìm thấy mục'}, status = 404)
        except:
            return Response({'message': 'Có lỗi xảy ra'}, status = 500)
        
class GetSpaceByCategoryView(APIView):
    def get(self, request, category_id):
        try:
            data = request.data
            if not category_id or category_id == -1:
                return Response({'message': 'Loại view không hợp lệ'}, status = 400)
            
            category = SpaceCategory.objects.get(id = category_id)
            spaces = Space.objects.filter(category = category)
            space_serializer = SpaceSerializer(spaces, many = True)
            return Response({'spaces': space_serializer.data}, status = 200)
        except SpaceCategory.DoesNotExist:
            return Response({'message': 'Không tìm thấy mục'}, status = 404)
        except:
            return Response({'message': 'Có lỗi xảy ra'}, status = 500)

class GetCategoryView(APIView):
    def get(self, request):
        categories = SpaceCategory.objects.all()
        category_serializer = SpaceCategorySerializer(categories, many = True)
        return Response({'categories': category_serializer.data}, status = 200)
    

