import type { Response } from 'express'
import type { CreateUserRequest } from '../types'
import { handleError } from '../utils'
import { createUser } from '../services'

export const createUserController = async (req: CreateUserRequest, res: Response) => {
  try {
    const user = await createUser(req.body)
    return res.status(201).json(user)
  } catch (error) {
    return handleError(error, res, 'error creating user')
  }
}
