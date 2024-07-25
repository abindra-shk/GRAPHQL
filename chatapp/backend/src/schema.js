import { gql } from 'graphql-tag';

const typeDefs = gql`
  type Message {
    id: ID!
    content: String!
    author: String!
    room: String!
  }

  type Query {
    messages(room: String!): [Message]
  }

  type Mutation {
    postMessage(content: String!, author: String!, room: String!): Message
  }

  type Subscription {
    messagePosted(room: String!): Message
  }
`;

export default typeDefs;
