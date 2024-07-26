import React from 'react';
import { Routes, Route } from 'react-router-dom';
import JoinRoom from '../components/JoinRoom';
import ChatRoom from '../components/ChatRoom';

const MainRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<JoinRoom />} />
      <Route path="/join-room" element={<JoinRoom />} />
      <Route path="/chat-room" element={<ChatRoom />} />
    </Routes>
  );
};

export default MainRoute;
