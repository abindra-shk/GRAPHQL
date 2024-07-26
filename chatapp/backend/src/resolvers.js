import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/user.js';
import Message from './models/message.js';
import { PubSub } from 'graphql-subscriptions';
import 'dotenv/config';
import { AuthService } from './services/authService.js';
import { getRoomName } from './utils/room.js';

const pubsub = new PubSub();
const JWT_SECRET = process.env.JWT_SECRET;

const resolvers = {
  Query: {
    messages: async (_, { room }) => {
      return Message.find({ room }).populate('author');
    },
    listPrivateMessage: async (_, { receiverId }, context) => {
      const user = await AuthService.getLoggedInUser(context.token);
      const roomName = getRoomName(user.id, receiverId);
      const messages = await Message.find({ room: roomName }).populate(
        'sender receiver'
      );
      return messages;
    },
    users: async () => {
      return User.find();
    },
  },
  Mutation: {
    postMessage: async (_, { content, receiver }, context) => {
      console.log('args', context);
      const loggedInUser = await AuthService.getLoggedInUser(context.token);
      const user = await User.findById(receiver);
      const roomName = getRoomName(loggedInUser.id, receiver);
      console.log('roomName===', roomName);
      if (!user) throw new Error('User not found');
      const message = new Message({
        content,
        sender: loggedInUser.id,
        receiver,
        room: roomName,
      });
      await message.save();
      const populatedMsg = await Message.findById(message.id).populate(
        'sender receiver'
      );
      console.log(populatedMsg);
      pubsub.publish(`MESSAGE_POSTED_${roomName}`, {
        messagePosted: populatedMsg,
      });
      return populatedMsg;
    },
    createUser: async (_, { username, password }) => {
      const user = new User({ username, password });
      await user.save();
      return user;
    },
    loginUser: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) throw new Error('User not found');
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error('Invalid password');
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: '1h',
      });
      return { token, user };
    },
  },
  Subscription: {
    messagePosted: {
      subscribe: (_, { room }) =>
        pubsub.asyncIterator([`MESSAGE_POSTED_${room}`]),
    },
    privateMessageReceived: {
      subscribe: (_, { room }) =>
        pubsub.asyncIterator([`PRIVATE_MESSAGE_RECEIVED_${room}`]),
    },
  },
};

export default resolvers;
