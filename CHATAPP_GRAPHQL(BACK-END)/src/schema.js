// src/schema.js
import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Message {
    id: ID!
    content: String!
    author: String!
  }

  type Query {
    messages: [Message]
  }

  type Mutation {
    postMessage(content: String!, author: String!): Message
  }

  type Subscription {
    messagePosted: Message
  }
`;

export default typeDefs;
