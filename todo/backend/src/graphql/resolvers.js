const Todo = require('../todo/todo.schema');

const resolvers = {
  Query: {
    getAllTodos: async () => {
      return await Todo.find({});
    },
    getTodoById: async (_, { id }) => {
      return await Todo.findById(id);
    },
  },
  Mutation: {
    createTodo: async (_, args) => {
      console.log('args', args);
      const newTodo = new Todo(args.data);
      await newTodo.save();
      return newTodo;
    },
    updateTodo: async (_, args) => {
      const updatedTodo = await Todo.findByIdAndUpdate(
        args.data.id,
        {
          title: args.data.title,
          description: args.data.description,
          status: args.data.status,
        },
        { new: true }
      );
      return updatedTodo;
    },
    deleteTodo: async (_, { id }) => {
      await Todo.findByIdAndDelete(id);
      return 'Todo deleted';
    },
  },
};

module.exports = resolvers;
