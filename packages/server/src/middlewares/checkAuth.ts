import { Request, Response, NextFunction } from 'express'
import { getErrorObject, getAuthCookies, fetchYandexUser } from '../utils'

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

    await fetchYandexUser(uuid, authCookie)

    return next()
  } catch (error) {
    return res.status(403).json(getErrorObject('Unauthorized'))
  }
}
