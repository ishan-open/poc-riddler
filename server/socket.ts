import { Server, Socket } from 'socket.io';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

const socketPort = parseInt(process.env.SOCKET_PORT!);
const io = new Server(socketPort, {
  cors: {
    origin: [`${process.env.FRONT_END_HOST}:${process.env.FRONT_END_PORT}`],
  },
});
const users: Record<string, User> = {};
interface User {
  userId: string;
  score: number;
}

io.on('connection', (socket: any) => {
  console.log('Made socket connection');

  socket.on('update-user', function (data: User) {
    console.log('on new-user');

    socket.userId = data.userId;
    users[data.userId] = data;

    io.emit('users', Object.values(users));
  });

  socket.on('disconnect', () => {
    delete users[socket.userId];
    io.emit('user-disconnected', socket.userId);
  });
});
