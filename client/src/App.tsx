import { useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_WEB_SOCKET);

function App() {
  useEffect(() => {
    socket.on('hello', console.log.bind(console, 'socket.on[hello]'));
  }, []);

  return (
    <div>
      <button onClick={() => socket.emit('good', 'boy')}>send</button>
    </div>
  );
}

export default App;
