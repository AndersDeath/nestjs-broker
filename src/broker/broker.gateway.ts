import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageService } from './services/message.service';
import { CreateMessageDto } from './dtos/create-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class BrokerGateway {
  constructor(private messageService: MessageService) {}
  @WebSocketServer()
  server: Server;

  private subscriptions: { [key: string]: Set<string> } = {}; // in progress

  private subs = new Map<string, Socket>();

  @SubscribeMessage('broker')
  async broker(
    @MessageBody() data: { id: string; body: JSON; topic: string },
    @ConnectedSocket() client: Socket,
  ): Promise<void> {
    await this.messageService.save(new CreateMessageDto(data.body, data.topic));
    this.subs.set(client.id, client);
    this.subs.forEach((socket: Socket, key: string) => {
      if (key !== client.id) {
        socket.emit('broker', data);
      }
    });
  }

  // in progress
  @SubscribeMessage('subscribe')
  subscribe(
    @MessageBody() data: any,
    // @ConnectedSocket() client: Socket,
  ): number {
    data.topics.forEach((topic: string) => {
      if (!this.subscriptions[topic]) {
        this.subscriptions[topic] = new Set([data.id as string]);
      } else {
        this.subscriptions[topic].add(data.id as string);
      }
    });

    console.log(this.subscriptions);

    return 404;
  }
}
