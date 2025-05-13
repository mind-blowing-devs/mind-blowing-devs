import redis from '../redisClient'

export async function getCachedUser(authCookieValue: string) {
  const raw = await redis.get(`auth:${authCookieValue}`)

  if (!raw) {
    throw new Error('No data found for this key')
  }

  let value
  try {
    value = JSON.parse(raw as string)
  } catch (error) {
    console.error(error)
    throw new Error('Failed to parse JSON data from Redis')
  }

  return value
}

export const parseCookies = (cookieString: string) => {
  return cookieString
    .split(';')
    .map(part => part.trim())
    .reduce<Record<string, string>>((acc, part) => {
      const [name, value] = part.split('=')
      if (name && value) {
        acc[name] = value
      }
      return acc
    }, {})
}
