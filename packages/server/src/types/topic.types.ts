import type { Request } from 'express'
import type { AnyObject } from './utils.types'
import { z } from 'zod'
import { createTopicSchema, updateTopicSchema } from '../schemas'

export type CreateTopicData = z.infer<typeof createTopicSchema>
export type UpdateTopicData = z.infer<typeof updateTopicSchema>

export type CreateTopicRequest = Request<AnyObject, AnyObject, CreateTopicData>
export type UpdateTopicRequest = Request<AnyObject, AnyObject, UpdateTopicData>
