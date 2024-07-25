const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');
const cors = require('cors');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const app = express();

// Middleware
app.use(cors({
    origin: '*'
}));

// MongoDB connection
mongoose.connect("mongodb+srv://abindrashakya123:MDaFGkjhm0kGdOpM@cluster0.a93lpb0.mongodb.net/todo?retryWrites=true&w=majority&appName=Cluster0");
const database = mongoose.connection;
database.on('error', (error) => {
    console.log(error);
});
database.once('connected', () => {
    console.log('Database Connected');
});

// Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req })
});

async function startServer() {
    await server.start();
    server.applyMiddleware({ app });
}

startServer();

// Start Express server
app.listen(8081, () => {
    console.log(`API is listening on port 8081`);
});
