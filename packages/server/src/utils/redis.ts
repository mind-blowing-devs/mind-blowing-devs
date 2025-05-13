import redis from '../redisClient'

export const saveUserIdWithAuthCookie = async (authCookie: string, userId: number) => {
  try {
    const redisKey = `auth:${authCookie}`

    const raw = await redis.get(redisKey)

    if (!raw) {
      throw new Error()
    }

    const redisValue = JSON.parse(raw)

    if (!redisValue.user.id) {
      redisValue.user = { id: userId }
      await redis.set(redisKey, JSON.stringify(redisValue), { KEEPTTL: true })
    }
  } catch (error) {
    throw new Error('Error during save user id in Redis')
  }
}

export const saveAuthCookieInRedis = async (authCookieStr: string) => {
  try {
    const valueMatch = authCookieStr.match(/^authCookie=([^;]+)/)
    const authCookieValue = valueMatch ? valueMatch[1] : null

    const expiresMatch = authCookieStr.match(/Expires=([^;]+)/i)
    let ttl = 60 * 60 * 24 // default 1 day

    if (expiresMatch) {
      const expiresAt = new Date(expiresMatch[1])
      const now = new Date()
      ttl = Math.max(0, Math.floor((expiresAt.getTime() - now.getTime()) / 1000))
    }

    if (authCookieValue) {
      await redis.set(`auth:${authCookieValue}`, JSON.stringify({ user: {} }), { EX: ttl })
    }
  } catch (error) {
    throw new Error('Error during save auth cookie in Redis')
  }
}

export const removeCookieFromRedis = async (authCookie: string) => {
  try {
    await redis.del(`auth:${authCookie}`)
  } catch (error) {
    throw new Error('Error during remove auth cookie from Redis')
  }
}
