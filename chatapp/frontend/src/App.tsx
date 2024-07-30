import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apolloClient';
import { Provider } from 'react-redux';
import store, { persistor } from './store/store';
import { ThemeProvider } from '@mui/material';
import theme from './themes/theme';
import { BrowserRouter } from 'react-router-dom';
import MainRoute from './routes/routes';
import { PersistGate } from 'redux-persist/integration/react';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
              <MainRoute />
            </BrowserRouter>
          </PersistGate>
        </Provider>
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
