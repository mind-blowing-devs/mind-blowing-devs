import axios from 'axios'
import { Cache } from '../utils'

type User = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  avatar: string
  email: string
  phone: string
}

const cache = new Cache()

export const fetchYandexUser = async (uuid: string, authCookie: string) => {
  const cacheKey = `yandexUser_${uuid}`

  const cached = cache.get(cacheKey)
  if (cached) {
    return cached as User
  }

  const response = await axios.get<User>(
    `${process.env.YANDEX_API_URL}/auth/user`,
    {
      headers: {
        Cookie: `uuid=${uuid}; authCookie=${authCookie};`,
      },
    }
  )

  cache.set(cacheKey, response.data)
  return response.data
}

const parseCookies = (cookieString: string) => {
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

export const getAuthCookies = (cookieHeader: string | undefined) => {
  const { uuid, authCookie } = parseCookies(cookieHeader || '')

  const valid = uuid && authCookie

  if (process.env.NODE_ENV === 'development' && !valid) {
    return {
      uuid: process.env.YANDEX_UUID,
      authCookie: process.env.YANDEX_AUTH_COOKIE,
    }
  }

  return { uuid, authCookie }
}
