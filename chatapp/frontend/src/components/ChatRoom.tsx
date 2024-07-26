import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Paper,
  TextField,
  Container,
} from '@mui/material';
import SendIcon from '../icons/Send'; // Make sure the path is correct
import useMessages from '../hooks/useMessages';
import usePostMessage from '../hooks/usePostMessage';
import useMessageSubscription from '../hooks/useMessageSubscription';

const ChatRoom: React.FC = () => {
  const user = useSelector((state: any) => state.user.user);
  const room = useSelector((state: any) => state.user.room);
  const [message, setMessage] = useState('');
  const { loading, error, messages, refetch } = useMessages(room);
  const postMessage = usePostMessage();

  useMessageSubscription(room, refetch);

  const handleSend = async () => {
    if (message.trim()) {
      await postMessage(message, user, room);
      setMessage('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  };

  if (!user || !room) {
    return <div>Please join a room to start chatting.</div>;
  }

  if (loading) return <p>Loading messages...</p>;
  if (error) return <p>Error loading messages</p>;

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: '#1c1f26' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome, {user}
          </Typography>
          <Typography variant="h6" component="div">
            Room: {room}
          </Typography>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="sm"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            borderRadius: '10px',
            width: '100%',
            color: 'white',
            backgroundColor: '#1c1f26',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              color: 'white',
              mb: 2,
            }}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Chat Room
            </Typography>
            <Box
              sx={{
                width: '100%',
                height: '350px',
                overflowY: 'auto',
                mb: 2,
                backgroundColor: '#2a2d34',
                padding: 2,
                borderRadius: '10px',
              }}
            >
              {messages.map((msg: any) => (
                <Box
                  key={msg.id}
                  sx={{
                    display: 'flex',
                    justifyContent:
                      msg.author === user ? 'flex-end' : 'flex-start',
                    mb: 1,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor:
                        msg.author === user ? '#ff4c4c' : '#4b4f58',
                      color: 'white',
                      padding: 1,
                      borderRadius: '10px',
                      maxWidth: '70%',
                    }}
                  >
                    <Typography variant="body2">
                      <strong>{msg.author}:</strong> {msg.content}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                mb: 2,
              }}
            >
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Type your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown} // Updated event handler
                sx={{
                  backgroundColor: '#1c1f26',
                  borderRadius: '10px',
                  height: '50px',
                  '& .MuiOutlinedInput-root': {
                    height: '100%',
                    '& fieldset': {
                      borderColor: '#4b4f58',
                    },
                    '&:hover fieldset': {
                      borderColor: '#6f737b',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#8b8e95',
                    },
                  },
                  '& input': {
                    color: 'white',
                  },
                  mr: 2,
                }}
                InputLabelProps={{
                  style: { color: 'white' },
                }}
              />
              <Box
                onClick={handleSend}
                sx={{
                  height: '60px',
                  minWidth: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <SendIcon color="#ff4c4c" size={40} />
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default ChatRoom;
