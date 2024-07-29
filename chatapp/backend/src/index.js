import mongoose from 'mongoose';
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
import 'dotenv/config';

// Create an Express app
const app = express();
// Create an HTTP server
const httpServer = createServer(app);

// Create the schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

async function startServer() {
  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }

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
  app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization;
        return { token };
      },
    })
  );

  // Create a WebSocket server
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql', // Ensure this path is correct
  });

  // Use the WebSocket server with graphql-ws
  const serverCleanup = useServer(
    {
      schema,
      // context: async (ctx) => {
      //   const token = ctx.connectionParams?.authorization;
      //   if (token) {
      //     const user = await AuthService.getUserFromToken(token);
      //     return { user };
      //   }
      //   throw new Error('Missing auth token!');
      // },
    },
    wsServer
  );

  // Listen on a specific port
  httpServer.listen(5001, '0.0.0.0', () => {
    console.log(`🚀 Server ready at http://10.0.2.153:5001/graphql`);
    console.log(`💬 Subscriptions ready at ws://10.0.2.153:5001/graphql`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start the server:', error);
});
