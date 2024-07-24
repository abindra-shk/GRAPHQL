import React from 'react';
import { useSelector } from 'react-redux';


const ChatRoom: React.FC = () => {
  const user = useSelector((state: any) => state.user.user);
  const room = useSelector((state: any) => state.user.room);

  if (!user || !room) {
    return <div>Please join a room to start chatting.</div>;
  }

  return (
    <div>
      <h2>Chat Room</h2>
      <p>User: {user}</p>
      <p>Room: {room}</p>
      {/* Add chat messages and input here */}
    </div>
  );
};

export default ChatRoom;
