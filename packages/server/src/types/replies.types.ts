import type { Request } from 'express'
import type { AnyObject } from './utils.types'
import { z } from 'zod'
import { createReplySchema, getRepliesSchema } from '../schemas'

export type CreateReplyData = z.infer<typeof createReplySchema>
export type CreateReplyRequest = Request<AnyObject, AnyObject, CreateReplyData>

export type GetRepliesData = z.infer<typeof getRepliesSchema>
export type GetRepliesRequest = Request<
  AnyObject,
  AnyObject,
  AnyObject,
  GetRepliesData
>
