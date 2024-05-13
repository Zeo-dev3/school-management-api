import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { ChatService } from './service/chat.service';
import { MessageService } from './service/message.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private chatService: ChatService,
    private messageService: MessageService,
  ) {}

  @WebSocketServer() server: Server;

  private rooms = new Map<string, string[]>();

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
  async handleMessage(client: Socket, message: string) {
    const senderId = client.id;
    const result = await this.messageService.createMessage(senderId, message);

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

  @SubscribeMessage('join')
  joinRoom(client: Socket) {}

  @SubscribeMessage('typing')
  async typing() {}
}
