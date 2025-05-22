import type { NextFunction, Request, Response } from 'express'
import axios from 'axios'
import { handleError, removeCookieFromRedis, saveAuthCookieInRedis } from '../utils'
import { YANDEX_API_BASE } from '../constants'

export const proxyToYandex = async (req: Request, res: Response, next: NextFunction) => {
  // Move to handler
  if (req.method === 'GET' && req.path.includes('/auth/user')) {
    return next()
  }

  try {
    const { uuid, authCookie } = req.userCookies || {}

    const cookieString = uuid && authCookie ? `uuid=${uuid}; authCookie=${authCookie}` : ''

    const headers = {
      Cookie: cookieString,
      'Content-Type': req.headers['content-type'],
    }

    const targetUrl = `${YANDEX_API_BASE}${req.path.replace('/api/yandex', '')}`

    const isMultipart = req.headers['content-type']?.startsWith('multipart/form-data')

    const yandexResponse = await axios({
      method: req.method,
      url: targetUrl,
      headers,
      data: isMultipart ? req : req.body,
      params: req.query,
      responseType: 'stream',
    })

    res.status(yandexResponse.status)

    for (const [key, value] of Object.entries(yandexResponse.headers)) {
      if (key.toLowerCase() === 'set-cookie' && Array.isArray(value)) {
        const rewrittenCookies = value.map(cookie => cookie.replace(/Domain=[^;]+;?/i, ''))
        res.setHeader('Set-Cookie', rewrittenCookies)

        const authCookieStr = value.find(c => c.startsWith('authCookie='))

        if (authCookieStr) {
          await saveAuthCookieInRedis(authCookieStr)
        }
      } else {
        res.setHeader(key, value)
      }
    }

    if (req.path.includes('/auth/logout') && authCookie) {
      await removeCookieFromRedis(authCookie)
    }

    return yandexResponse.data.pipe(res)
  } catch (error) {
    return handleError(error, res, 'Error while proxying to Yandex API')
  }
}
