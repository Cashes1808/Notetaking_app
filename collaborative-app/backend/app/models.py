from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class CustomUser(AbstractUser):
    # Add additional fields if necessary, e.g., profile picture
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username