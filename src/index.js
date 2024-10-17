import { ApolloServer } from "@apollo/server"
import { expressMiddleware } from "@apollo/server/express4"
import cors from "cors"
import express from "express"

import { EXPRESS_HOST, EXPRESS_PORT, EXPRESS_APOLLO } from "./config/index.js"

import database from "./db/index.js"
import typeDefs from "./graphql/typedefs.js"
import resolvers from "./graphql/resolvers.js"

database.connect()

const app = express()

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
