import type { ZodSchema } from 'zod'
import type { Request, Response, NextFunction } from 'express'
import { getErrorObject } from '../utils'

export const validateRequestData = <T extends ZodSchema>(
  schema: T,
  source: 'body' | 'query' = 'body'
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dataToValidate = source === 'body' ? req.body : req.query
    const result = await schema.safeParseAsync(dataToValidate)

    if (!result.success) {
      const errorMessage = result.error.errors[0].message

      return res.status(400).json(getErrorObject(errorMessage))
    }

    if (source === 'body') {
      req.body = result.data
    } else {
      req.query = result.data
    }
    next()
    return
  }
}
