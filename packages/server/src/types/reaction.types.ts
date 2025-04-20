import { Request } from 'express'
import { z } from 'zod'
import {
  getReactionsSchema,
  addReactionSchema,
  removeReactionSchema,
} from '../schemas/reaction.schema'

/**
 * Тип пользователя для запросов
 */
export interface User {
  id: number
}

/**
 * Типы для контроллеров
 */
export type GetReactionsRequest = Request<
  Record<string, never>,
  unknown,
  Record<string, never>,
  z.infer<typeof getReactionsSchema>
> & {
  user?: User
}

export type AddReactionRequest = Request<
  Record<string, never>,
  unknown,
  z.infer<typeof addReactionSchema>
> & {
  user?: User
}

export type RemoveReactionRequest = Request<
  z.infer<typeof removeReactionSchema>
> & {
  user?: User
}
