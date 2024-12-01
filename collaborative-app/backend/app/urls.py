from django.urls import path
from .views import LoginView, UserProfileView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterUserView
from .views import CanvasListCreateView, CanvasRetrieveUpdateDestroyView


urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
     path('canvas/', CanvasListCreateView.as_view(), name='canvas_list_create'),
    path('canvas/<int:pk>/', CanvasRetrieveUpdateDestroyView.as_view(), name='canvas_detail'),

]
