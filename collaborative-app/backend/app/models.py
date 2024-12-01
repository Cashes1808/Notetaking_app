from django.contrib.auth.models import AbstractUser, User
from django.db import models
from django.conf import settings

# Create your models here.
class CustomUser(AbstractUser):
    # Add additional fields if necessary, e.g., profile picture
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username
    
class Canvas(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='canvases')
    name = models.CharField(max_length=100)
    data = models.TextField()  # Canvas JSON data
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name