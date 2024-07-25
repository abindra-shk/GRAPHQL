import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { GET_MESSAGES, POST_MESSAGE, MESSAGE_POSTED } from '../graphql/queries';

const ChatRoom: React.FC = () => {
  const user = useSelector((state: any) => state.user.user);
  const room = useSelector((state: any) => state.user.room);
  const [message, setMessage] = useState('');
  const { loading, error, data, refetch } = useQuery(GET_MESSAGES, {
    variables: { room },
  });

  const [postMessage] = useMutation(POST_MESSAGE);
  useSubscription(MESSAGE_POSTED, {
    variables: { room },
    onSubscriptionData: ({ subscriptionData }) => {
      refetch();
    },
  });

  const handleSend = async () => {
    if (message.trim()) {
      await postMessage({
        variables: {
          content: message,
          author: user,
          room,
        },
      });
      setMessage('');
    }
  };

  if (!user || !room) {
    return <div>Please join a room to start chatting.</div>;
  }

  if (loading) return <p>Loading messages...</p>;
  if (error) return <p>Error loading messages</p>;

  return (
    <div>
      <h2>Chat Room</h2>
      <div>
        {data.messages.map((msg: any) => (
          <div key={msg.id}>
            <strong>{msg.author}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatRoom;
