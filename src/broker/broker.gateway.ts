import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
// import { Socket } from 'dgram';
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

  constructor() {
    // this.server = new Server();
    // // console.log(this.server);
    // // this.server.conn
    // this.server.emit('some', { some: 'new' });
    // this.server.on('some', (answer) => console.log(answer));
  }

  // private eventHandlers = new Map<string, (...args: any[]) => void>();

  // registerDynamicEvent(eventName: string, callback: (...args: any[]) => void) {
  //   console.log(eventName);
  //   this.eventHandlers.set(eventName, callback);
  // }

  // @SubscribeMessage('push')
  // handleDynamicEvent(
  //   client: Socket,
  //   { eventName, data }: { eventName: string; data: any },
  // ) {
  //   const handler = this.eventHandlers.get(eventName);
  //   if (handler) {
  //     handler(data);
  //   }
  // }

  @SubscribeMessage('push')
  topics(@MessageBody() data: string): WsResponse<string> {
    console.log(data);
    return { event: 'topics', data: 'some topic motherfucker' };
  }

  @SubscribeMessage('pull')
  findAll(): Observable<WsResponse<number>> {
    console.log('sss');
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
