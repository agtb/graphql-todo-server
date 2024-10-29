export default (todoService) => ({
  Query: {
    hello: (_, { name }) => {
      return `Hello, ${name}!`
    },
    todos: async () => {
      try {
        const todos = await todoService.readTodo()
        return todos
      } catch (err) {
        console.error(err)
        throw err
      }
    },
  },
  Mutation: {
    createTodo: async (_, { text, completed }) => {
      return await todoService.createTodo(text, (completed = false))
    },
    deleteTodo: async (_, { id }) => {
      return await todoService.deleteTodo(id)
    },
    updateTodo: async (_, { id, text, completed }) => {
      return await todoService.updateTodo(id, text, completed)
    },
  },
})
