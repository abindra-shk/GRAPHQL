import { useState } from 'react';
import { useMutation, gql, useQuery, useSubscription } from '@apollo/client';
import { useSelector } from 'react-redux';
import { Box, TextField, Typography, Container, Paper } from '@mui/material';
import SendIcon from '../icons/Send';

const GET_MESSAGES = gql`
  query GetMessages($roomId: String!) {
    messages(roomId: $roomId) {
      id
      content
      sender {
        id
        username
      }
      receiver {
        id
        username
      }
      createdAt
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation PostMessage($content: String!, $receiver: ID!) {
    postMessage(content: $content, receiver: $receiver) {
      id
      content
      sender {
        id
        username
      }
      receiver {
        id
        username
      }
      room
      createdAt
    }
  }
`;

const MESSAGE_SUBSCRIPTION = gql`
  subscription OnMessagePosted($room: String!) {
    messagePosted(room: $room) {
      id
      content
      sender {
        id
        username
      }
      receiver {
        id
        username
      }
      room
      createdAt
    }
  }
`;

interface ChatBoxProps {
  selectedUser: string;
}

const ChatBox: React.FC<ChatBoxProps> = ({ selectedUser }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const currentRoom = useSelector((state: any) => state.user.room);
  const currentUser = useSelector((state: any) => state.user.user);

  const { data, loading, error, refetch } = useQuery(GET_MESSAGES, {
    variables: { roomId: currentRoom },
    skip: !currentRoom,
    onCompleted: (data) => {
      setMessages(data.messages);
    },
  });

  console.log('selected user', selectedUser);
  console.log('current room', currentRoom);

  const [sendMessage] = useMutation(SEND_MESSAGE);

  useSubscription(MESSAGE_SUBSCRIPTION, {
    variables: { room: currentRoom },
    onSubscriptionData: ({ subscriptionData }) => {
      if (!subscriptionData.data) return;

      const newMessage = subscriptionData.data.messagePosted;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      
      // Update UI with the new message
      // if (data && data.messages) {
      //   data.messages.push(newMessage);
      // }
    },
  });

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedUser) return;

    try {
      await sendMessage({
        variables: { content: message, receiver: selectedUser },
      });
      setMessage(''); // Clear input field after sending message
      refetch(); // Optionally refetch messages to ensure UI consistency
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!currentRoom)
    return <Typography>Select a user to start chatting</Typography>;
  if (loading) return <Typography>Loading messages...</Typography>;
  if (error) return <Typography>Error loading messages</Typography>;

  return (
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
            {data.messages.map((msg: any) => (
              <Box
                key={msg.id}
                sx={{
                  display: 'flex',
                  justifyContent:
                    msg.sender.id === currentUser.id
                      ? 'flex-end'
                      : 'flex-start',
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    backgroundColor:
                      msg.sender.id === currentUser.id ? '#ff4c4c' : '#4b4f58',
                    color: 'white',
                    padding: 1,
                    borderRadius: '10px',
                    maxWidth: '70%',
                  }}
                >
                  <Typography variant="body2">
                    <strong>{msg.sender.username}:</strong> {msg.content}
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
              onClick={handleSendMessage}
              sx={{
                height: '60px',
                minWidth: '60px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <SendIcon color="#ff4c4c" size={40} />
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default ChatBox;
