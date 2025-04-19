import 'reflect-metadata'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import express from 'express'
import { topicRoutes, commentRoutes, replyRoutes } from './routes'
import { connectDB } from './db'

const envConfig =
  process.env.NODE_ENV === 'development'
    ? { path: path.resolve(__dirname, '../../../.env') }
    : undefined

dotenv.config(envConfig)

const app = express()
const PORT = Number(process.env.SERVER_PORT) || 3001

app.use(cors())
app.use(express.json())

app.use('/api/topics', topicRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/replies', replyRoutes)

async function startServer() {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to connect to database:', error)
    process.exit(1)
  }
}

startServer()
