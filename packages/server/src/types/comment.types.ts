import type { Request } from 'express'
import type { AnyObject } from './utils.types'
import { z } from 'zod'
import {
  createCommentSchema,
  getCommentsSchema,
  commentIdSchema,
} from '../schemas'

export type CreateCommentData = z.infer<typeof createCommentSchema>
export type CreateCommentRequest = Request<
  AnyObject,
  AnyObject,
  CreateCommentData
>

export type GetCommentsData = z.infer<typeof getCommentsSchema>
export type GetCommentsRequest = Request<
  AnyObject,
  AnyObject,
  AnyObject,
  GetCommentsData
>

export type DeleteCommentData = z.infer<typeof commentIdSchema>
export type DeleteCommentRequest = Request<
  DeleteCommentData,
  AnyObject,
  AnyObject
>
