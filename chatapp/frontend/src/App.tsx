import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apolloClient';
import JoinRoom from './components/JoinRoom';
import ChatRoom from './components/ChatRoom';
import { Provider } from 'react-redux';
import { store } from './store/store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <div>
          <JoinRoom />
          <ChatRoom />
        </div>
      </ApolloProvider>
    </Provider>
  );
};

export default App;
