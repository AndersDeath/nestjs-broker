import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class BrokerGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('topics')
  topics(@MessageBody() data: string): WsResponse<string> {
    console.log(data);
    return { event: 'topics', data: 'some topic motherfucker' };
  }

  @SubscribeMessage('events')
  findAll(): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(
      map((item) => ({ event: 'events', data: item })),
    );
  }

  @SubscribeMessage('identity')
  identity(@MessageBody() data: number): number {
    console.log(data);
    return data;
  }
}
