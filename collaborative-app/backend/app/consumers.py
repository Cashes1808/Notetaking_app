from channels.generic.websocket import AsyncWebsocketConsumer
import json

class CollaborationConsumer(AsyncWebsocketConsumer):
    """ Define a WebSocket consumer in Django Channels, specifically designed for handling real-time collaboration using WebSockets.
        This class inherits from AsyncWebsocketConsumer and defines methods to handle WebSocket events.
    """
    async def connect(self) -> None:
        """
        Handles the WebSocket connection open event.

        Called when a WebSocket connection is opened. The consumer is
        initialized and joined to the room group. The connection is then
        accepted.

        :param self: The consumer instance
        :return: None
        """
        self.room_name = self.scope['url_route']['kwargs']['room_name'] # Extracts the room name from the URL route.
        self.room_group_name = f'room_{self.room_name}'                 # Constructs a group name for the room

        # Join the room group
        # Adds the WebSocket connection to a group, allowing multiple clients to be part of the same group.
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )
        # Accepts the WebSocket connection.
        await self.accept()

    async def disconnect(self, close_code) -> None:
        """
        Handles the WebSocket connection close event.

        Called when a WebSocket connection is closed. The consumer is
        removed from the room group.

        :param self: The consumer instance
        :param close_code: The close code of the WebSocket connection
        :return: None
        """
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data) -> None:
        """
        Handles the reception of a message over the WebSocket.

        This method is called when a WebSocket message is received. It
        decodes the incoming text data from JSON format to extract the
        message content and broadcasts it to the room group.

        :param self: The consumer instance
        :param text_data: The incoming WebSocket message as a JSON string
        :return: None
        """
        data = json.loads(text_data)            # Deserializes the received JSON data.
        message = data['message']               # Extracts the message from the data.

        # Broadcast message to the room
        # Sends the message to all WebSocket connections in the group.
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message
            }
        )

    async def chat_message(self, event) -> None:
        """
        Handles the reception of a message from the room group.

        This method is called when a message is received from the room group.
        It extracts the message content from the event and sends it to the
        WebSocket connection.

        :param event: The event containing the message content
        :return: None
        """
        
        message = event['message']                  # Extracts the message from the event

        # Send message to WebSocket
        # Sends the message back to the WebSocket client.
        await self.send(text_data=json.dumps({
            'message': message
        }))
