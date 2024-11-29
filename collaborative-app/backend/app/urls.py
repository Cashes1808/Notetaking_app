"""Set up URL routing for your Django application."""
from django.urls import path
from .views import home

# This is a list of URL patterns that Django will use to match URLs to views.
urlpatterns = [
    # An empty string as the URL pattern indicates the root URL (i.e., http://mydomain.com/).
    # home: This is the view function that will be called when the root URL is accessed. In this case, it’s the home view imported from the views.py file.
    path('', home),
]
