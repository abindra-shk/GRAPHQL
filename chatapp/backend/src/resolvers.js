import { PubSub } from 'graphql-subscriptions';
import messages from './data/messages.js';

const pubsub = new PubSub();

const resolvers = {
  Query: {
    messages: (_, { room }) => messages.filter(message => message.room === room),
  },
  Mutation: {
    postMessage: (_, { content, author, room }) => {
      const message = { id: Date.now().toString(), content, author, room };
      messages.push(message);
      pubsub.publish(`MESSAGE_POSTED_${room}`, { messagePosted: message });
      return message;
    },
  },
  Subscription: {
    messagePosted: {
      subscribe: (_, { room }) => pubsub.asyncIterator([`MESSAGE_POSTED_${room}`]),
    },
  },
};

export default resolvers;
