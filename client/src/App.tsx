import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_WEB_SOCKET);
interface User {
  userId: string;
  score: number;
}
function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>({
    userId: new Date().getTime().toString(),
    score: 0,
  });
  useEffect(() => void socket.on('users', setUsers), []);
  useEffect(() => {
    const currentUser = users.find(u => u.userId === user.userId);
    if (currentUser) setUser(currentUser);
  }, [users]);

  const score = Math.ceil(Math.random() * 30 - 15);
  return (
    <div>
      <button onClick={() => socket.emit('update-user', user)}>register</button>
      <button
        onClick={() =>
          socket.emit('update-user', { ...user, score: user.score + score })
        }
      >
        score += {score}
      </button>
      <hr />
      <ul>
        {users.map(user => (
          <li key={user.userId}>
            <strong>{user.userId}</strong>: <span>{user.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
