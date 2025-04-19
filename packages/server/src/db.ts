import { Sequelize } from 'sequelize-typescript'
import { Topic } from './models/topic.model'
import { Comment } from './models/comment.model'
import { Reply } from './models/reply.model'
import dotenv from 'dotenv'
import path from 'path'

const envConfig =
  process.env.NODE_ENV === 'development'
    ? { path: path.resolve(__dirname, '../../../.env') }
    : undefined

dotenv.config(envConfig)

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost', // or service name in docker-compose if app in docker
  port: Number(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DB,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  models: [Topic, Comment, Reply],
})

export const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connected to PostgreSQL!')
    await sequelize.sync({ alter: true }) // use { force: true } to drop and recreate tables
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    throw error
  }
}
