import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private chatService: ChatService) {}

  @WebSocketServer() server: Server;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(server: Server) {
    console.log(`Websocket initialized`);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleConnection(client: Socket, ...args: any[]) {
    console.log(`${client.id} connected to the gateway`);
  }

  handleDisconnect(client: Socket) {
    console.log(`${client.id} disconnected to the gateway`);
  }

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, message: string): Promise<void> {
    const senderId = client.id;
    const result = await this.chatService.sendMessage(senderId, message);

    // Convert the IterableIterator to an array
    const recipients = Array.from(this.server.sockets.sockets.values());

    // Filter out the sender from the recipients
    const filteredRecipients = recipients.filter(
      (socket) => socket.id !== senderId,
    );

    // Send the message to all recipients except the sender
    for (const recipient of filteredRecipients) {
      recipient.emit('newMessage', result);
    }
  }
}
