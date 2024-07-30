import React from 'react';
import { Routes, Route } from 'react-router-dom';
import JoinRoom from '../components/JoinRoom';
import ChatRoom from '../components/ChatRoom';
import LoginForm from '../components/Login';
import RegisterForm from '../components/RegisterForm';
import ChatPage from '../pages/ChatPage';

const MainRoute: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/join-room" element={<JoinRoom />} />
      <Route path="/chat-room" element={<ChatRoom />} />
      <Route path="/chatpage" element={<ChatPage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm/>} />

    </Routes>
  );
};

export default MainRoute;
