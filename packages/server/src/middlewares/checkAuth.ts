import { Request, Response, NextFunction } from 'express'
import { getErrorObject, getAuthCookies, fetchYandexUser } from '../utils'
import { User } from '../types/reaction.types'

declare module 'express' {
  interface Request {
    user?: User
  }
}

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  if (
    (req.method === 'GET' && req.path === '/api/visualthemes') ||
    (req.method === 'POST' && req.path === '/api/auth/signUp')
  ) {
    return next()
  }

  try {
    const { uuid, authCookie } = getAuthCookies(req.headers.cookie)

    if (!uuid || !authCookie) {
      return res.status(403).json(getErrorObject('Unauthorized'))
    }

    const yandexUser = await fetchYandexUser(uuid, authCookie)

    req.user = {
      id: yandexUser.id,
    }

    return next()
  } catch (error) {
    return res.status(403).json(getErrorObject('Unauthorized'))
  }
}
