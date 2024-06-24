import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Server } from 'socket.io';
import { createServer } from 'http';
import { io as ClientSocket, Socket as ClientSocketType } from 'socket.io-client';
import { MessagesGateway } from './app.gateway';
import { MessagesService } from './messages/messages.service';
import { CreateMessageDto } from './messages/dto/create-message.dto';

class MockMessagesService {
  async createMessage(payload: CreateMessageDto) {
    return {
      chat_id: payload.chat_id,
      sender_id: payload.sender_id,
      receiver_id: payload.receiver_id,
      message: payload.message,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}

describe('MessagesGateway', () => {
  let app: INestApplication;
  let ioServer: Server;
  let clientSocket: ClientSocketType;
  let httpServer;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [
        MessagesGateway,
        { provide: MessagesService, useClass: MockMessagesService },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    httpServer = createServer();
    ioServer = new Server(httpServer);
    ioServer.listen(3000);

    ioServer.on('connection', (socket) => {
      const gateway = app.get(MessagesGateway);
      gateway.handleConnection(socket);
      socket.on('disconnect', () => gateway.handleDisconnect(socket));
      socket.on('create_message', (data) => gateway.handleSendMessage(socket, data));
    });

    clientSocket = ClientSocket('http://localhost:3000');
  });

  afterAll(async () => {
    clientSocket.close();
    ioServer.close();
    httpServer.close();
    await app.close();
  });

  it('should connect to the gateway and receive a response', (done) => {
    clientSocket.on('connect', () => {
      const messageDto: CreateMessageDto = {
        chat_id: 'chat123',
        sender_id: 'user123',
        receiver_id: 'user456',
        message: 'Hello!',
      };

      clientSocket.emit('create_message', messageDto);

      clientSocket.on('response_message', (data) => {
        try {
          expect(data.status).toBe('success');
          expect(data.data).toHaveProperty('chat_id', 'chat123');
          expect(data.data).toHaveProperty('sender_id', 'user123');
          expect(data.data).toHaveProperty('receiver_id', 'user456');
          expect(data.data).toHaveProperty('message', 'Hello!');
          done();
        } catch (error) {
          done(error);
        }
      });
    });

    clientSocket.on('connect_error', (error) => {
      done(error);
    });

    clientSocket.on('disconnect', () => {});
  }, 10000); // Increase timeout to 10 seconds
});
