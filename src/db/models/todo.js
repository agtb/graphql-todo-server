import { mongoose, Schema } from "mongoose"

const todoSchema = new Schema({
  text: String,
  completed: Boolean,
})

const Todo = mongoose.model("Todo", todoSchema)

export default Todo
