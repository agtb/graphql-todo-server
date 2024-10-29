const mockTodos = [
  {
    _id: "1",
    text: "Add TODO to do the do.",
    completed: true,
    __v: 0,
  },
  {
    _id: "2",
    text: "Remove TODON'Ts.",
    completed: false,
    __v: 0,
  },
  {
    _id: "3",
    text: "Reticulate the splines...",
    completed: false,
    __v: 0,
  },
]

const todoService = {
  async createTodo(text) {
    return {
      _id: "5",
      text: text,
      completed: false,
      __v: 0,
    }
  },

  async deleteTodo(id) {
    return {
      _id: id,
      text: "Oh no! I have been deleted! Anyway...",
      completed: false,
      __v: 0,
    }
  },

  async readTodo(data) {
    try {
      return mockTodos
    } catch (err) {
      console.error(err)
      throw err
    }
  },

  async updateTodo(id, text, completed) {
    // Change text and completed status
    if (text !== undefined && completed !== undefined)
      return {
        _id: id,
        text: text,
        completed: completed,
        __v: 0,
      }

    // Change only text
    if (text !== undefined)
      return {
        _id: id,
        text: text,
        completed: true,
        __v: 0,
      }

    // Change only completed
    if (completed !== undefined)
      return {
        _id: id,
        text: "Text has not been changed",
        completed: completed,
        __v: 0,
      }
  },
}

export default todoService
