from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser
from .models import Canvas

admin.site.register(CustomUser, UserAdmin)

@admin.register(User)
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active')

@admin.register(Canvas)
class CanvasAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'created_at')  # Fields to display
    list_filter = ('user', 'created_at')          # Filters in sidebar
