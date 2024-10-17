import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import { mongoose, Schema } from "mongoose"
import cors from "cors"
import express from "express"
import gql from "graphql-tag"

const EXPRESS_HOST = process.env.EXPRESS_HOST
const EXPRESS_PORT = process.env.EXPRESS_PORT
const EXPRESS_APOLLO = process.env.EXPRESS_APOLLO

const MONGODB_HOST = process.env.MONGODB_HOST
const MONGODB_PORT = process.env.MONGODB_PORT
const MONGODB_PATH = process.env.MONGODB_PATH
const MONGODB_AUTH = process.env.MONGODB_AUTH
const MONGODB_USERNAME = process.env.MONGODB_USERNAME
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD

const app = express()

const todoSchema = new Schema({
  text: String,
  completed: Boolean,
})

const Todo = mongoose.model("Todo", todoSchema)

/*
# Add Variable
mutation AddTodo($text: String!) {
  addTodo(text: $text) {
    text
  }
}

query Todos {
  todos {
    id,
    text,
    completed
  }
}

MongoDB
"""""""
use graphql_todo
todos.find()
*/

const typeDefs = gql`
  # Test query
  type Query {
    hello: String
  }
  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
  }
  type Query {
    todos: [Todo]
  }
  type Mutation {
    addTodo(text: String!): Todo
    updateTodo(id: ID!, completed: Boolean!): Todo
    deleteTodo(id: ID!): Todo
  }
`

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

const mongoDbUri = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_PATH}${MONGODB_AUTH}`

// Connect to MongoDB
mongoose
  .connect(mongoDbUri, {})
  .then(() => {
    console.log(`🍃 MongoDB connected!`)
  })
  .catch((err) => {
    console.log(err.message)
  })

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
})

await apolloServer.start()

// TODO remove test route only
app.get("/", (req, res) => {
  res.send("Hello, world!") // TODO remove
})

app.use(
  "/" + EXPRESS_APOLLO, // Apollo sandbox
  cors(),
  express.json(),
  expressMiddleware(apolloServer),
)

app.listen(EXPRESS_PORT, () => {
  console.log(
    `🚀 Server up @ http://${EXPRESS_HOST}:${EXPRESS_PORT}/${EXPRESS_APOLLO}`,
  )
})
