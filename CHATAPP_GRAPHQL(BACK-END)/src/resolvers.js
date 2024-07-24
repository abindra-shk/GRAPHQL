// src/resolvers.js
import { PubSub } from 'graphql-subscriptions';
import messages from './data/messages.js';

const pubsub = new PubSub();

const resolvers = {
  
  Query: {
    messages: () => messages,
  },
  Mutation: {
    postMessage: (_, { content, author }) => {
      const message = { id: Date.now().toString(), content, author };
      messages.push(message);
      pubsub.publish('MESSAGE_POSTED', { messagePosted: message });
      return message;
    },
  },
  Subscription: {
    messagePosted: {
      subscribe: () => pubsub.asyncIterator(['MESSAGE_POSTED']),
    },
  },
};

export default resolvers;
