"""Defines a Django view that returns a JSON response when accessed."""
from django.http import JsonResponse

def home(request) -> JsonResponse:
    """
    Handle the root endpoint and return a JSON response with a welcome message.

    Args:
        request: The HTTP request object.
                 This parameter represents the HTTP request received by the server.

    Returns:
        JsonResponse: A JSON response containing a welcome message.
    """
    return JsonResponse({"message": "Welcome to the backend!"})
