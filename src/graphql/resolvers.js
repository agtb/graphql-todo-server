import Todo from "../db/models/todo.js"

const resolvers = {
  Query: {
    // Test query
    hello: () => "Hello, world!",
    todos: async () => {
      try {
        const todos = await Todo.find()
        return todos
      } catch (err) {
        console.error(err)
        throw err
      }
    },
  },
  Mutation: {
    addTodo: async (_, { text }) => {
      const todo = new Todo({ text, completed: false })
      await todo.save()
      return todo
    },
    updateTodo: async (_, { id, completed }) => {
      return Todo.findByIdAndUpdate(id, { completed }, { new: true })
    },
    deleteTodo: async (_, { id }) => {
      return Todo.findByIdAndRemove(id)
    },
  },
}

export default resolvers
