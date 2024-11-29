# Note-taking_app
 This app allows for easy, seamless, natural note-taking  


# Flow of creation 
## Structure 
collaborative-app/
├── backend/                         # Backend files (Django application)
│   ├── app/
│   │   ├── __init__.py
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializers.py
│   │   ├── urls.py
│   │   └── consumers.py
│   ├── project/
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── asgi.py
│   │   └── wsgi.py
│   ├── manage.py
│   ├── requirements.txt
│   └── virtual_env/                 # Virtual environment directory
│       ├── Scripts/
│       └── Lib/
├── frontend/                        # Frontend (React) application
│   ├── public/                      # Static public assets
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/                         # React source files
│   │   ├── components/              # React components
│   │   │   ├── Canvas.js            # Main canvas component
│   │   │   ├── Toolbar.js           # Toolbar with tools
│   │   │   ├── MarkdownEditor.js    # Shape-like Markdown editor
│   │   │   └── Shape.js             # Optional abstraction for shapes
│   │   ├── styles/                  # CSS stylesheets
│   │   │   ├── global.css
│   │   │   ├── Toolbar.css
│   │   │   └── Canvas.css
│   │   ├── App.js                   # Main React component
│   │   ├── index.js                 # ReactDOM entry point
│   │   └── utils/                   # Utility functions
│   │       ├── shapeUtils.js        # Logic for shapes (e.g., linking)
│   │       └── markdownUtils.js     # Helpers for Markdown rendering
│   ├── package.json                 # Dependencies
│   └── package-lock.json
├── websocket/                       # WebSocket integration for real-time collaboration
│   ├── routing.py                   # WebSocket URL routing
│   ├── asgi.py                      # ASGI server configuration
│   └── consumers.py                 # WebSocket consumer logic
├── deployment/                      # Deployment configurations
│   ├── Dockerfile-backend           # Backend Dockerfile
│   ├── Dockerfile-frontend          # Frontend Dockerfile
│   ├── nginx.conf                   # Nginx configuration (if applicable)
│   └── README.md                    # Deployment instructions
└── docker-compose.yml               # Docker Compose configuration

## Backend setup 
### Create the main project folder and move into it
mkdir collaborative-app
cd collaborative-app

### Set up folders for backend, frontend, and WebSocket functionality
mkdir backend frontend websocket deployment

### Navigate to the backend directory and initialize a virtual environment
cd backend
python -m venv venv
### Activate the virtual environment (on Windows)
.\venv\Scripts\activate

### Install Django and Django Channels for the backend
pip install django channels djangorestframework

### Create the Django project
django-admin startproject project .

### Add the app for managing core functionalities
python manage.py startapp app

### Create a requirements file
pip freeze > requirements.txt

### directory looking lie this
backend/
├── app/
│   ├── migrations/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── urls.py
│   ├── models.py
│   ├── tests.py
│   ├── views.py
│   └── serializers.py
├── project/
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── manage.py
├── venv
└── requirements.txt

### Configure the Backend
Edit settings.py
Add app, rest_framework, and channels to INSTALLED_APPS:


INSTALLED_APPS = [
    # Default apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party apps
    'rest_framework',
    'channels',

    # Your app
    'app',
]

### Set up Django Channels
Modify the asgi.py file in the project/ directory to include channels.routing:

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            # WebSocket URL configuration will go here later
            []
        )
    ),
})


### Set Up User Authentication
#### Custom User Model
To allow future customization (e.g., adding user preferences), use a custom user model.

app/models.py

from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    # Add additional fields if necessary, e.g., profile picture
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.username

#### Update settings.py to use this custom user model:
AUTH_USER_MODEL = 'app.CustomUser'


### Serializers for User Management
Use Django REST Framework for user-related API endpoints.

app/serializers.py

from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'bio')

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

### User Authentication Views
We’ll create API endpoints for user registration and login.

app/views.py

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from .serializers import RegisterSerializer, UserSerializer

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully"}, status=201)
        return Response(serializer.errors, status=400)

class LoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            return Response({"message": "Login successful"})
        return Response({"message": "Invalid credentials"}, status=401)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)


###  API Routing
Add the new endpoints to your URL configuration.

app/urls.py

from django.urls import path
from .views import RegisterView, LoginView, UserProfileView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
]
project/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('app.urls')),
]

### WebSocket Integration
Add WebSocket functionality for real-time collaboration.
Modify project/asgi.py:

import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from app.consumers import NoteConsumer

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            [
                # WebSocket routes go here
                path("ws/notes/", NoteConsumer.as_asgi()),
            ]
        )
    ),
})
Create a WebSocket Consumer in app/consumers.py:
import json
from channels.generic.websocket import AsyncWebsocketConsumer

class NoteConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("notes", self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("notes", self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        await self.channel_layer.group_send(
            "notes",
            {
                "type": "note_message",
                "message": data["message"],
            }
        )

    async def note_message(self, event):
        message = event["message"]
        await self.send(text_data=json.dumps({"message": message}))

Update settings.py:
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels_redis.core.RedisChannelLayer",
        "CONFIG": {
            "hosts": [("127.0.0.1", 6379)],
        },
    },
}

## Frontend setup 
### Install React and Dependencies
npx create-react-app frontend
cd frontend
npm install axios react-router-dom react-konva konva react-markdown

### Build the Canvas Component
Create a canvas with Konva.js to handle drawing.

src/components/Canvas.js

iimport React, { useState } from "react";
import { Stage, Layer, Rect, Circle, Line, Text } from "react-konva";
import MarkdownEditor from "./MarkdownEditor";

function Canvas() {
  const [tool, setTool] = useState("select"); // Current selected tool
  const [shapes, setShapes] = useState([]); // List of all shapes
  const [selectedId, setSelectedId] = useState(null); // Currently selected shape

  const handleMouseDown = (e) => {
    if (tool === "select") return;

    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();

    if (tool === "rectangle") {
      const newRect = {
        id: `rect-${shapes.length + 1}`,
        type: "rectangle",
        x: pointerPosition.x,
        y: pointerPosition.y,
        width: 100,
        height: 50,
        fill: "blue",
      };
      setShapes([...shapes, newRect]);
    } else if (tool === "circle") {
      const newCircle = {
        id: `circle-${shapes.length + 1}`,
        type: "circle",
        x: pointerPosition.x,
        y: pointerPosition.y,
        radius: 50,
        fill: "green",
      };
      setShapes([...shapes, newCircle]);
    } else if (tool === "markdown") {
      const newMarkdown = {
        id: `markdown-${shapes.length + 1}`,
        type: "markdown",
        x: pointerPosition.x,
        y: pointerPosition.y,
        content: "Start writing in Markdown!",
      };
      setShapes([...shapes, newMarkdown]);
    }
  };

  const handleShapeClick = (id) => {
    setSelectedId(id);
  };

  const renderShapes = () => {
    return shapes.map((shape) => {
      if (shape.type === "rectangle") {
        return (
          <Rect
            key={shape.id}
            x={shape.x}
            y={shape.y}
            width={shape.width}
            height={shape.height}
            fill={shape.fill}
            draggable
            onClick={() => handleShapeClick(shape.id)}
          />
        );
      } else if (shape.type === "circle") {
        return (
          <Circle
            key={shape.id}
            x={shape.x}
            y={shape.y}
            radius={shape.radius}
            fill={shape.fill}
            draggable
            onClick={() => handleShapeClick(shape.id)}
          />
        );
      } else if (shape.type === "markdown") {
        return (
          <MarkdownEditor
            key={shape.id}
            x={shape.x}
            y={shape.y}
            content={shape.content}
            draggable
            onClick={() => handleShapeClick(shape.id)}
          />
        );
      }
    });
  };

  return (
    <div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
      >
        <Layer>{renderShapes()}</Layer>
      </Stage>
    </div>
  );
}

export default Canvas;


### Add Toolbar
Add shape tools in a sidebar.

src/components/Toolbar.js

import React from "react";
import "./Toolbar.css"; // Add styles for the toolbar

function Toolbar({ onSelectTool }) {
  return (
    <div className="toolbar">
      <button onClick={() => onSelectTool("select")}>Select</button>
      <button onClick={() => onSelectTool("rectangle")}>Rectangle</button>
      <button onClick={() => onSelectTool("circle")}>Circle</button>
      <button onClick={() => onSelectTool("line")}>Line</button>
      <button onClick={() => onSelectTool("text")}>Text</button>
      <button onClick={() => onSelectTool("markdown")}>Markdown Editor</button>
    </div>
  );
}

export default Toolbar;
