import { ApolloServer } from "@apollo/server"

import typeDefs from "./graphql/typedefs.js"
import resolvers from "./graphql/resolvers.js"

import Todo from "./db/models/todo.js"

describe("Apollo server correctly responds", () => {
  it("Query: Hello world responds with 'Hello, world!'", async () => {
    const testServer = new ApolloServer({ typeDefs, resolvers: resolvers(Todo) })

    const response = await testServer.executeOperation({
      query: "query SayHelloWorld($name: String) { hello(name: $name) }",
      variables: { name: "world" },
    })

    expect(response.body.kind === "single")
    expect(response.body.singleResult.errors).toBeUndefined()
    expect(response.body.singleResult.data?.hello).toBe("Hello, world!")
  })
})
