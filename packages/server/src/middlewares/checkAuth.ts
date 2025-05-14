import type { Request, Response, NextFunction } from 'express'
import { getErrorObject, getCachedUser, parseCookies } from '../utils'
import type { User } from '../types'
declare module 'express' {
  interface Request {
    user?: User
    userCookies?: {
      uuid: string
      authCookie: string
    }
  }
}

export const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'GET' && req.path.includes('visualthemes')) {
    return next()
  }

  try {
    const { uuid, authCookie } = parseCookies(req.headers.cookie ?? '')

    if (req.path.includes('signin') || req.path.includes('signup') || req.path.includes('oauth')) {
      if (uuid && authCookie) {
        return res.status(409).json(getErrorObject('User already exists'))
      }

      return next()
    }

    if (!uuid || !authCookie) {
      throw new Error()
    }

    const { user } = await getCachedUser(authCookie)

    if (user.id) {
      req.user = {
        id: user.id,
      }
    }

    req.userCookies = { uuid, authCookie }

    return next()
  } catch (error) {
    return res.status(403).json(getErrorObject('Unauthorized'))
  }
}
