# Notetaking_app
 This app allows for easy, seamless, natural notetaking  

# Flow of creation 
## Create the main project folder and move into it
mkdir collaborative-app
cd collaborative-app

## Set up folders for backend, frontend, and WebSocket functionality
mkdir backend frontend websocket deployment

## Navigate to the backend directory and initialize a virtual environment
cd backend
python -m venv venv
## Activate the virtual environment (on Windows)
.\venv\Scripts\activate

## Install Django and Django Channels for the backend
pip install django channels djangorestframework

## Create the Django project
django-admin startproject project .

## Add the app for managing core functionalities
python manage.py startapp app

## Create a requirements file
pip freeze > requirements.txt

