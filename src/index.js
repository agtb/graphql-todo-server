import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import cors from "cors"
import express from "express"

import { EXPRESS_HOST, EXPRESS_PORT, EXPRESS_APOLLO } from "./config/index.js"

import database from "./db/index.js"
import resolvers from "./graphql/resolvers.js"
import todoService from "./services/todo-service.js"
import Todo from "./db/models/todo.js"
import typeDefs from "./graphql/typedefs.js"

database.connect()

const app = express()

const apolloServer = new ApolloServer({
  typeDefs,
  // resolvers: resolvers(Todo),
  resolvers: resolvers(todoService(Todo)),
})

await apolloServer.start()

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
