// src/apolloClient.ts
import { ApolloClient, InMemoryCache, split } from '@apollo/client';
import { createClient as createWsClient } from 'graphql-ws';
import { HttpLink } from '@apollo/client/link/http';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

// HTTP and WebSocket URLs
const httpUri = 'http://localhost:5000/graphql';
const wsUri = 'ws://localhost:5000/subscriptions';

// Create an HTTP link
const httpLink = new HttpLink({ uri: httpUri });

// Create a WebSocket link
const wsLink = new WebSocketLink(createWsClient({ url: wsUri }));

// Use split to direct traffic based on operation type
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink
);

// Create Apollo Client instance
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

export default client;
