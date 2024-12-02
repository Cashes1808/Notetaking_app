from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer, UserSerializer
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from .models import Canvas
from .serializers import CanvasSerializer
from asgiref.sync import sync_to_async
from django.contrib.auth import authenticate 
from asgiref.sync import sync_to_async 
from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework import status
class LoginView(APIView):
    async def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = await sync_to_async(authenticate)(username=username, password=password)
        if user:
            return Response({"message": "Login successful"})
        return Response({"message": "Invalid credentials"}, status=401)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
class RegisterUserView(APIView):
    permission_classes = [AllowAny]  # This view is open to unauthenticated users

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class CanvasListCreateView(ListCreateAPIView):
    serializer_class = CanvasSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Canvas.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CanvasRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    serializer_class = CanvasSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Canvas.objects.filter(user=self.request.user)