"""setting up routing for WebSocket connections in your Django project using Django Channels."""
from django.urls import path
from backend.app.consumers import CollaborationConsumer

# websocket_urlpatterns: This is a list that defines the URL patterns for WebSocket connections.
# path('ws/collaborate/<str:room_name>/', CollaborationConsumer.as_asgi()):
# 'ws/collaborate/<str:room_name>/': This defines the WebSocket URL path. 
#   The ws prefix indicates that this is for WebSocket connections. 
#   <str:room_name> is a dynamic segment of the URL that captures the room name as a string and passes it to the consumer.
# CollaborationConsumer.as_asgi(): This creates an ASGI application instance of the CollaborationConsumer class. 
#   The as_asgi() method is similar to the as_view() method for Django views, transforming the consumer class into an ASGI application that can handle WebSocket connections.

websocket_urlpatterns = [
    path('ws/collaborate/<str:room_name>/', CollaborationConsumer.as_asgi()),
]
