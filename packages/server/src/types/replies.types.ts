import type { Request } from 'express'
import type { AnyObject } from './utils.types'
import { z } from 'zod'
import { createReplySchema, getRepliesSchema } from '../schemas'

export type AddReplyData = z.infer<typeof createReplySchema>
export type AddReplyRequest = Request<AnyObject, AnyObject, AddReplyData>

export type GetRepliesData = z.infer<typeof getRepliesSchema>
export type GetRepliesRequest = Request<
  AnyObject,
  AnyObject,
  AnyObject,
  GetRepliesData
>
