import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/apolloClient';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ThemeProvider } from '@mui/material';
import theme from './themes/theme';
import { BrowserRouter } from 'react-router-dom';
import MainRoute from './routes/routes';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <MainRoute />
          </BrowserRouter>
        </ApolloProvider>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
