import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

import express from 'express'
import topicRoutes from './routes/topic.routes'
import commentRoutes from './routes/comment.routes'
import replyRoutes from './routes/reply.routes'

const app = express()
const port = Number(process.env.SERVER_PORT) || 3001

app.use(cors())
app.use(express.json())

app.use('/api/forum/topics', topicRoutes)
app.use('/api/forum/comments', commentRoutes)
app.use('/api/forum/replies', replyRoutes)

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
