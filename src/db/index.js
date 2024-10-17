import { mongoose } from "mongoose"

import {
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_PATH,
  MONGODB_AUTH,
  MONGODB_USERNAME,
  MONGODB_PASSWORD,
} from "../config/index.js"

export const mongoDbUri = `mongodb://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_PATH}${MONGODB_AUTH}`

export const connect = () => {
  mongoose
    .connect(mongoDbUri, {})
    .then(() => {
      console.log(`🍃 MongoDB connected!`)
    })
    .catch((err) => {
      console.log(err.message)
    })
}

export default {
  connect,
  mongoDbUri,
}
