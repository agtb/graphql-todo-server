const todoService = (Todo) => ({
  async createTodo(text, completed) {
    const todo = new Todo({ text, completed })
    await todo.save()

    return todo
  },

  async deleteTodo(id) {
    return await Todo.findByIdAndDelete(id)
  },

  async readTodo() {
    try {
      const todos = await Todo.find()

      return todos
    } catch (err) {
      console.error(err)
      throw err
    }
  },

  async updateTodo(id, text, completed) {
    // Change text and completed status
    if (text !== undefined && completed !== undefined)
      return await Todo.findByIdAndUpdate(
        id,
        { text, completed },
        { new: true },
      )

    // Change only text
    if (text !== undefined)
      return await Todo.findByIdAndUpdate(id, { text }, { new: true })

    // Change only completed
    if (completed !== undefined)
      return await Todo.findByIdAndUpdate(id, { completed }, { new: true })
  },
})

export default todoService
