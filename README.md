# Nestjs-Broker

# Nestjs-Broker

- [Nestjs Broker](#nestjs-broker)
  - [Preface](#preface)
  - [Installation](#installation)
  - [Run](#run)
  - [Setting up pgAdmin and PostgreSQL Server](#setting-up-pgadmin-and-postgresql-server)

## Preface

The application is based on:

1. Nestjs Framework
2. PostgreSQL

## Installation

1. Clone this repository
2. Run `npm install`
3. Create a copy of .env.sample as .env
4. Put your credentials to .env You need.
   1. PORT=port_number
   2. PG_HOST=db
   3. PG_PORT=5432
   4. PG_USERNAME=username
   5. PG_PASSWORD=password
   6. PG_DATABASE=database

## Run

You can install your PostrgeSQL and connect to it, but I recommend use Docker compose. You need to install it to your machine and then run `docker compose up`.
When the application is successfully run you can get an access to following urls

1. localhost:3000 - Nestjs application
2. localhost:5432 - PostgreSQL database address
3. localhost:5050 - PgAdmin

If you use this approach you need to scroll down to pgAdmin setup section and create Postgresql server

## Setting up pgAdmin and PostgreSQL Server

1. Open PgAdmin in the web browser by visiting http://localhost:5050 (assuming we're using the default configuration in the docker-compose.yml file).
2. Log in using your email and password in the docker-compose.yml file for the pgadmin service.
3. In the left-hand sidebar, click Servers to expand the Servers menu.
4. Right-click on Servers and select Register -> Server.
5. In the General tab of the Create - Server dialog, we can give the server a name of our choice.
6. In the Connection tab, fill in the following details:

```Host name/address: db
    Port: 5432
    Maintenance database: postgres
    Username: postgres
    Password: postgres
```

# How it works

The api documentations is available in Swagger on http://localhost:3000/api#/ 

The available functionality is limited. For now only exchanging messages via socket connection is available and messages endpoints for getting information via api.

## Example connections from web client:

```html
<html>
  <head>
    <script
      src="https://cdn.socket.io/4.3.2/socket.io.min.js"
      integrity="sha384-KAZ4DtjNhLChOB/hxXuKqhMLYvx3b5MlT55xPEiNmREKRzeEm+RVPlTnAn0ajQNs"
      crossorigin="anonymous"
    ></script>
    <script>
      const socket = io('http://localhost:3000');
      const id = 'theFirstId';
      socket.on('connect', function () {
        socket.emit(
          'broker',
          {
            id: id,
            topic: 'first topic',
            data: { text: 'some text' },
          },
          (response) => console.log('Some response:', response),
        );
      });

      socket.on('disconnect', function () {
        console.log('Disconnected');
      });
    </script>
  </head>

  <body>
  </body>
</html>
```

## Example connections from nodejs server (NestJS):

```typescript
import { Injectable, Logger } from '@nestjs/common';
import { io, Socket } from 'socket.io-client';

@Injectable()
export class AppService {
  private socket: Socket;
  private logger: Logger = new Logger(AppService.name);
  constructor() {}
  initialize() {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', () => {
      const id = 'theSecondId';

      this.logger.debug('Connect to something');
      this.socket.emit(
        'broker',
        {
          id,
          topic: 'first topic',
          data: 'some message another another',
        },
        (answer) => {
          console.log('Answer', answer);
        },
      );

      this.socket.on('broker', (message) => {
        console.log(message);
      });
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
  }
}
```

In these example some functionality like topic support and clientIds are in progress.


## What should be covered in the future updates

1. Topics support
2. ClientIds support for detecting the same services after their possible reload
3. Authentication and Authorization via optional api token or jwt.
4. After finalizing the main functionality cover the service by tests.