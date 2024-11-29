"""
ASGI (Asynchronous Server Gateway Interface) config for project project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from websocket.routing import websocket_urlpatterns


# Environment variable is set to the project's settings module (project.settings). 
# This is necessary for Django to locate the settings.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')

# Initializes the default Django ASGI application for handling HTTP requests.
application = get_asgi_application()

# ProtocolTypeRouter: Routes different types of protocol connections to their respective handlers.
# "http": Uses the default ASGI application for handling HTTP requests.
# "websocket": Uses an AuthMiddlewareStack and URLRouter to handle WebSocket connections.
# AuthMiddlewareStack: Provides authentication support for WebSocket connections, ensuring that users are authenticated.
# URLRouter: Routes WebSocket connections to the appropriate consumer based on the URL patterns defined in websocket_urlpatterns.
application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(websocket_urlpatterns)
    ),
})
