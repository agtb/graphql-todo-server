import gql from "graphql-tag"

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

export default typeDefs
