import type { Response } from 'express'
import { NOT_FOUND_MESSAGES } from '../constants'
import { getErrorObject } from './getErrorObject'

export function handleError(
  error: unknown,
  res: Response,
  message = 'An unexpected error occurred'
) {
  if (error instanceof Error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res
        .status(400)
        .json({ message: 'Topic with this title already exists' })
    }

    const errorMessage =
      NOT_FOUND_MESSAGES[error.message as keyof typeof NOT_FOUND_MESSAGES]
    if (errorMessage) {
      return res.status(404).json(getErrorObject(errorMessage))
    }

    return res.status(500).json(getErrorObject(message))
  }
  return
}
