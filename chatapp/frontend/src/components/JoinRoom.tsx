import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRoom, setUser } from '../features/userSlice';



const JoinRoom: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user.user);
  const room = useSelector((state: any) => state.user.room);
  const [name, setName] = useState('');
  const [roomName, setRoomName] = useState('');

  const handleJoin = () => {
    dispatch(setUser(name));
    dispatch(setRoom(roomName));
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>Welcome, {user}</h2>
          <h3>Room: {room}</h3>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter room name"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
          />
          <button onClick={handleJoin}>Join Room</button>
        </div>
      )}
    </div>
  );
};

export default JoinRoom;
