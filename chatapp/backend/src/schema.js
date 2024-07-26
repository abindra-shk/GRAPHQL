import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Message {
    id: ID!
    content: String!
    sender: User!
    receiver: User!
    room: String!
    createdAt: String!
  }

  type User {
    id: ID!
    username: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Query {
    messages(room: String!): [Message]
    users: [User]
    listPrivateMessage(receiverId:ID!):[Message]
  }

  type Mutation {
    postMessage(content: String!, receiver: ID!): Message
    createUser(username: String!, password: String!): User
    loginUser(username: String!, password: String!): AuthPayload
  }

  type Subscription {
    messagePosted(room: String!): Message
    privateMessageReceived(room: String!): Message
  }
`;

export default typeDefs;
