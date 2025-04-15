import 'reflect-metadata'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
import topicRoutes from './routes/topic.routes'
import commentRoutes from './routes/comment.routes'
import replyRoutes from './routes/reply.routes'
import { connectDB } from './db'

const app = express()
const PORT = Number(process.env.SERVER_PORT) || 3001

app.use(cors())
app.use(express.json())

app.use('/api/forum/topics', topicRoutes)
app.use('/api/forum/comments', commentRoutes)
app.use('/api/forum/replies', replyRoutes)

async function startServer() {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error('Failed to connect to database:', err)
    process.exit(1)
  }
}

startServer()
