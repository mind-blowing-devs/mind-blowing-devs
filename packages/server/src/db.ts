import { Sequelize } from 'sequelize-typescript'
import { Topic, Comment, Reply, VisualTheme, UserVisualTheme, Reaction } from './models'

import dotenv from 'dotenv'
import path from 'path'

const envConfig =
  process.env.NODE_ENV === 'development'
    ? { path: path.resolve(__dirname, '../../../.env') }
    : undefined

dotenv.config(envConfig)

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } = process.env

const POSTGRES_HOST = process.env.NODE_ENV === 'development' ? 'localhost' : 'postgres'

export const sequelize = new Sequelize({
  dialect: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  database: POSTGRES_DB,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  models: [Topic, Comment, Reply, Reaction, VisualTheme, UserVisualTheme],
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
