import * as config from "./index.js"

const expectedConfig = [
  { key: "EXPRESS_HOST" },
  { key: "EXPRESS_PORT" },
  { key: "EXPRESS_APOLLO" },
  { key: "MONGODB_HOST" },
  { key: "MONGODB_PORT" },
  { key: "MONGODB_PATH" },
  { key: "MONGODB_AUTH" },
  { key: "MONGODB_USERNAME" },
  { key: "MONGODB_PASSWORD" },
]

describe("Configuration file contains all expected keys", () => {
  test.each(expectedConfig)("$key", ({ key }) => {
    expect(config).toHaveProperty(key)
  })
})
