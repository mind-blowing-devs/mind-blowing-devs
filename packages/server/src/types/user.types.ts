import type { Request } from 'express'
import type { AnyObject } from './utils.types'
import { z } from 'zod'
import { createUserSchema } from '../schemas'

export type CreateUserData = z.infer<typeof createUserSchema>
export type CreateUserRequest = Request<AnyObject, AnyObject, CreateUserData>
