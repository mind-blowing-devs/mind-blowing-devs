import type { ZodSchema } from 'zod'
import type { Request, Response, NextFunction } from 'express'

export const validateBody = <T extends ZodSchema>(schema: T) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      const errorMessage = result.error.errors[0].message

      return res.status(400).json({
        reason: errorMessage,
      })
    }

    req.body = result.data
    next()
    return
  }
}
