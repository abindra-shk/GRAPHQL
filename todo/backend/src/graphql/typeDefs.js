const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Todo {
    id: ID!
    title: String!
    description: String!
    status: String!
  }

  type Query {
    getAllTodos: [Todo]
    getTodoById(id: ID!): Todo
  }

  input CreateToDoInput {
    title: String!
    description: String!
    status: String!
  }

  input UpdateToDoInput {
    id: ID!
    title: String
    description: String
    status: String
  }

  type Mutation {
    createTodo(data: CreateToDoInput): Todo
    updateTodo(data: UpdateToDoInput): Todo
    deleteTodo(id: ID!): String
  }
`;

module.exports = typeDefs;
