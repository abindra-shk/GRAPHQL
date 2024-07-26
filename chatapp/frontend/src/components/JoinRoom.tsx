import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setRoom, setUser } from '../features/userSlice';
import { TextField, Button, Box, Typography, Container, Paper } from '@mui/material';

const JoinRoom: React.FC = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state: any) => state.user.user);
  // const room = useSelector((state: any) => state.user.room);
  const [name, setName] = useState('');
  const [roomName, setRoomName] = useState('');
  const navigate = useNavigate();

  const handleJoin = () => {
    dispatch(setUser(name));
    dispatch(setRoom(roomName));
    navigate('/chat-room');
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
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
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Join Room
          </Typography>
          <TextField
            fullWidth
            label="Enter your name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{
              style: { color: 'white' },
            }}
            InputProps={{
              style: { color: 'white' },
            }}
          />
          <TextField
            fullWidth
            label="Enter room name"
            variant="outlined"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{
              style: { color: 'white' },
            }}
            InputProps={{
              style: { color: 'white' },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleJoin}
            fullWidth
            size="large"
            sx={{ mt: 2, height: '52px' }}
          >
            Join Room
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default JoinRoom;
