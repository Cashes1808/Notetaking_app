# Notetaking_app
 This app allows for easy, seamless, natural notetaking  

# Flow of creation 
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

### Step 2: Configure the Backend
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





