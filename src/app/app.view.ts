export const template = `<html>
  <head>
    <script
      src="https://cdn.socket.io/4.3.2/socket.io.min.js"
      integrity="sha384-KAZ4DtjNhLChOB/hxXuKqhMLYvx3b5MlT55xPEiNmREKRzeEm+RVPlTnAn0ajQNs"
      crossorigin="anonymous"
    ></script>
    <script>
      const socket = io('http://localhost:3000');
      socket.on('connect', function () {
        console.log('Connected');

        socket.emit('events', { test: 'test' });
        socket.emit('identity', 0, (response) =>
          console.log('Identity:', response),
        );
      });
      socket.on('events', function (data) {
        console.log('event', data);
      });
      socket.on('exception', function (data) {
        console.log('event', data);
      });
      socket.on('disconnect', function () {
        console.log('Disconnected');
      });
    </script>
  </head>

  <body>This template works!</body>
</html>`;
