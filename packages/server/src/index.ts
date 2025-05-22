import 'reflect-metadata'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import express from 'express'
import {
  topicRoutes,
  commentRoutes,
  replyRoutes,
  visualThemeRoutes,
  reactionRoutes,
} from './routes'
import { connectDB } from './db'
import { seedVisualThemes } from './seeding'
import { checkAuth, proxyToYandex } from './middlewares'
import { getUserController } from './controllers'
import redis from './redisClient'

const envConfig =
  process.env.NODE_ENV === 'development'
    ? { path: path.resolve(__dirname, '../../../.env') }
    : undefined

dotenv.config(envConfig)

const app = express()
const PORT = Number(process.env.SERVER_PORT)

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'development'
        ? process.env.ORIGIN_DEV_URL
        : process.env.ORIGIN_PROD_URL,
    credentials: true,
  })
)
app.use(express.json())
app.use(checkAuth)

app.use('/api/yandex', proxyToYandex, getUserController)
app.use('/api/topics', topicRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/replies', replyRoutes)
app.use('/api/visualthemes', visualThemeRoutes)
app.use('/api/reactions', reactionRoutes)

async function startServer() {
  try {
    await connectDB()
    await redis.connect()
    await seedVisualThemes()
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.error('Failed to connect to database:', error)
    process.exit(1)
  }
}

startServer()
