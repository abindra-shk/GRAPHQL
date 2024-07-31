import { Grid, Paper } from '@mui/material';
import UserList from '../components/UserList';
import ChatBox from '../components/ChatBox';
import { useState } from 'react';

const ChatPage = () => {
  const [selectedUser, setSelectedUser] = useState('');

  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      <Grid item xs={3}>
        <Paper
          elevation={3}
          sx={{
            height: '500px',
            display:'flex',
            // alignItems:'center',
            overflowY: 'auto',
            padding: 2,
            borderRadius: '10px',
            backgroundColor: '#1c1f26',
            color: 'white',
          }}
        >
          <UserList onSelectUser={setSelectedUser} />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <ChatBox selectedUser={selectedUser} />
      </Grid>
    </Grid>
  );
};

export default ChatPage;
