import type { Request, Response } from 'express'
import { handleError, saveUserIdWithAuthCookie } from '../utils'
import { YANDEX_API_BASE } from '../constants'
import { getYandexUser } from '../services'

export const getUserController = async (req: Request, res: Response) => {
  try {
    const { uuid, authCookie } = req.userCookies ?? {}
    const targetUrl = `${YANDEX_API_BASE}${req.path.replace('/api/yandex', '')}`

    if (!uuid || !authCookie) {
      throw new Error()
    }

    const { user, status } = await getYandexUser(uuid, authCookie, targetUrl)

    if (!user.id) {
      throw new Error()
    }

    await saveUserIdWithAuthCookie(authCookie, user.id)

    return res.status(status).json(user)
  } catch (error) {
    return handleError(error, res)
  }
}
