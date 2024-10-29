import { jest } from "@jest/globals"
import { ApolloServer } from "@apollo/server"
import gql from "graphql-tag"

import resolvers from "./resolvers.js"
import typeDefs from "../graphql/typedefs.js"

import mockTodoService from "../services/__mocks__/todo-service.js"

describe("Resolvers return correct data for queries.", () => {
  it("Query: Hello world", async () => {
    const testServer = new ApolloServer({
      typeDefs: typeDefs,
      resolvers: resolvers(mockTodoService),
    })

    const response = await testServer.executeOperation({
      query: gql`
        query HelloWorld($name: String) {
          hello(name: $name)
        }
      `,
      variables: { name: "world" },
    })

    expect(response.body.kind === "single")
    expect(response.body.singleResult.errors).toBeUndefined()
    expect(response.body.singleResult.data?.hello).toBe("Hello, world!")
  })

  it("Query: Todos", async () => {
    const testServer = new ApolloServer({
      typeDefs: typeDefs,
      resolvers: resolvers(mockTodoService),
    })

    const response = await testServer.executeOperation({
      query: gql`
        query Todos {
          todos {
            text
            completed
          }
        }
      `,
    })

    expect(response.body.kind === "single")
    expect(response.body.singleResult.errors).toBeUndefined()
    expect(response.body.singleResult.data?.todos).toMatchSnapshot()
  })

  it("Query: Todos with error", async () => {
    const spyConsole = jest.spyOn(console, "error").mockImplementation(() => {})

    const testServer = new ApolloServer({
      typeDefs: typeDefs,
      resolvers: resolvers(null),
    })

    const response = await testServer.executeOperation({
      query: gql`
        query Todos {
          todos {
            text
            completed
          }
        }
      `,
    })

    expect(spyConsole).toHaveBeenCalled()

    expect(response.body.kind === "single")
    expect(response.body.singleResult.errors).toMatchSnapshot()
    expect(response.body.singleResult.data?.todos).toMatchSnapshot()

    spyConsole.mockReset()
  })
})

describe("Resolvers return correct data for mutations.", () => {
  it("Mutation: createTodo", async () => {
    const testServer = new ApolloServer({
      typeDefs: typeDefs,
      resolvers: resolvers(mockTodoService),
    })

    const response = await testServer.executeOperation({
      query: gql`
        mutation CreateTodo($text: String!) {
          createTodo(text: $text) {
            text
            completed
          }
        }
      `,
      variables: { text: "Create a todo. Make it so!" },
    })

    expect(response.body.kind === "single")
    expect(response.body.singleResult.errors).toBeUndefined()
    expect(response.body.singleResult.data?.createTodo).toMatchSnapshot()
  })

  it("Mutation: deleteTodo", async () => {
    const testServer = new ApolloServer({
      typeDefs: typeDefs,
      resolvers: resolvers(mockTodoService),
    })

    const response = await testServer.executeOperation({
      query: gql`
        mutation DeleteTodo($id: ID!) {
          deleteTodo(id: $id) {
            text
            completed
          }
        }
      `,
      variables: { id: 5 },
    })

    expect(response.body.kind === "single")
    expect(response.body.singleResult.errors).toBeUndefined()
    expect(response.body.singleResult.data?.deleteTodo).toMatchSnapshot()
  })

  it("Mutation: updateTodo complete todo", async () => {
    const testServer = new ApolloServer({
      typeDefs: typeDefs,
      resolvers: resolvers(mockTodoService),
    })

    const response = await testServer.executeOperation({
      query: gql`
        mutation UpdateTodo($id: ID!, $completed: Boolean!) {
          updateTodo(id: $id, completed: $completed) {
            text
            completed
          }
        }
      `,
      variables: { id: 3, completed: true },
    })

    expect(response.body.kind === "single")
    expect(response.body.singleResult.errors).toBeUndefined()
    expect(response.body.singleResult.data?.updateTodo).toMatchSnapshot()
  })

  it("Mutation: updateTodo uncomplete todo", async () => {
    const testServer = new ApolloServer({
      typeDefs: typeDefs,
      resolvers: resolvers(mockTodoService),
    })

    const response = await testServer.executeOperation({
      query: gql`
        mutation UpdateTodo($id: ID!, $completed: Boolean!) {
          updateTodo(id: $id, completed: $completed) {
            text
            completed
          }
        }
      `,
      variables: { id: 3, completed: false },
    })

    expect(response.body.kind === "single")
    expect(response.body.singleResult.errors).toBeUndefined()
    expect(response.body.singleResult.data?.updateTodo).toMatchSnapshot()
  })

  it("Mutation: updateTodo change text of todo", async () => {
    const testServer = new ApolloServer({
      typeDefs: typeDefs,
      resolvers: resolvers(mockTodoService),
    })

    const response = await testServer.executeOperation({
      query: gql`
        mutation UpdateTodo($id: ID!, $text: String!) {
          updateTodo(id: $id, text: $text) {
            text
            completed
          }
        }
      `,
      variables: { id: 3, text: "Update the text of this todo." },
    })

    expect(response.body.kind === "single")
    expect(response.body.singleResult.errors).toBeUndefined()
    expect(response.body.singleResult.data?.updateTodo).toMatchSnapshot()
  })
})
