import { Sequelize } from 'sequelize-typescript'
import { Topic } from './models/topic.model'
import { Comment } from './models/comment.model'
import { Reply } from './models/reply.model'
import dotenv from 'dotenv'
dotenv.config()

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost', // or service name in docker-compose in app in docker
  port: process.env.POSTGRES_PORT ? Number(process.env.DB_PORT) : 5432,
  database: 'user',
  username: 'user',
  password: 'password',
  models: [Topic, Comment, Reply],
})

export const connectDB = async () => {
  try {
    await sequelize.authenticate()
    console.log('Connected to PostgreSQL!')
    // await sequelize.sync({ force: true }) // Use { force: true } to drop and recreate tables
  } catch (error) {
    console.error('Unable to connect to the database:', error)
    throw error
  }
}
