import { createClient } from 'redis'
import dotenv from 'dotenv'
import path from 'path'

const envConfig =
  process.env.NODE_ENV === 'development'
    ? { path: path.resolve(__dirname, '../../../.env') }
    : undefined

dotenv.config(envConfig)

const REDIS_HOST = process.env.NODE_ENV === 'development' ? 'localhost' : 'redis'

const redis = createClient({
  url: `redis://${REDIS_HOST}:${process.env.REDIS_PORT}`,
})

redis.on('error', err => console.error('Redis connection error:', err))
redis.on('connect', () => console.log('Connected to Redis'))

export default redis
