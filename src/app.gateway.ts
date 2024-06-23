import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { CreateMessageDto } from './messages/dto/create-message.dto';
import { MessagesService } from './messages/messages.service';

@WebSocketGateway()
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private users: Map<string, string> = new Map(); // userId -> socketId

  constructor(private readonly messagesService: MessagesService) {}

  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    this.users.set(userId, client.id);
  }

  handleDisconnect(client: Socket) {
    const userId = Array.from(this.users.keys()).find(key => this.users.get(key) === client.id);
    if (userId) {
      this.users.delete(userId);
    }
  }

  @SubscribeMessage('create_message')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: CreateMessageDto,
  ): Promise<void> {
    await this.messagesService.createMessage(payload);
    const receiverSocketId = this.users.get(payload.receiver_id);
    if (receiverSocketId) {
      this.server.to(receiverSocketId).emit('response_message', payload);
    }
  }
}
