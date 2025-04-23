import { Sequelize } from 'sequelize-typescript'
import { Topic } from './models/topic.model'
import { Comment } from './models/comment.model'
import { Reply } from './models/reply.model'
import { User } from './models/user.model'
import { VisualTheme } from './models/visualTheme.model'
import { UserVisualTheme } from './models/userVisualTheme.model'
import { Reaction } from './models/reaction.model'
import dotenv from 'dotenv'
import path from 'path'

const envConfig =
  process.env.NODE_ENV === 'development'
    ? { path: path.resolve(__dirname, '../../../.env') }
    : undefined

dotenv.config(envConfig)

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

const POSTGRES_HOST =
  process.env.NODE_ENV === 'development' ? 'localhost' : 'postgres'

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  models: [Topic, Comment, Reply, Reaction, User, VisualTheme, UserVisualTheme]
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
