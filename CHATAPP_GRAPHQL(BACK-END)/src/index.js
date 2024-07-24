// src/index.js
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';

// Create an Express app
const app = express();
// Create an HTTP server
const httpServer = createServer(app);

// Create the schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

async function startServer() {
  // Create an Apollo Server instance
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              // Ensure serverCleanup is defined before usage
              if (typeof serverCleanup !== 'undefined') {
                await serverCleanup.dispose();
              }
            },
          };
        },
      },
    ],
  });

  // Start the Apollo server
  await server.start();

  // Apply middleware to the Express app
  app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server));

  // Create a WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/subscriptions', // Ensure this path is correct
  });

  // Use the WebSocket server with graphql-ws
  const serverCleanup = useServer({ schema }, wsServer);

  // Listen on a specific port
  httpServer.listen(5000, () => {
    console.log(`🚀 Server ready at http://localhost:5000/graphql`);
    console.log(`💬 Subscriptions ready at ws://localhost:5000/subscriptions`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start the server:', error);
});
