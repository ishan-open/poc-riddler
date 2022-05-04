import { Server } from 'socket.io';

const socketPort = parseInt(process.env.SOCKET_PORT!);
const io = new Server(socketPort, {
  cors: {
    origin: [`${process.env.FRONT_END_HOST}:${process.env.FRONT_END_PORT}`],
  },
});

io.on('connect', socket => {
  console.log('connected');

  socket.emit('hello', 'world');
  socket.on('good', console.log.bind(console, '[good]::'));
});
