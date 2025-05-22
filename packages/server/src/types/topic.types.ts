import type { Request } from 'express'
import type { AnyObject } from './utils.types'
import { z } from 'zod'
import { createTopicSchema, updateTopicSchema, getAllTopicsSchema, topicIdSchema } from '../schemas'

export type CreateTopicData = z.infer<typeof createTopicSchema>
export type CreateTopicRequest = Request<AnyObject, AnyObject, CreateTopicData>

export type GetAllTopicsData = z.infer<typeof getAllTopicsSchema>
export type GetAllTopicsRequest = Request<AnyObject, AnyObject, AnyObject, GetAllTopicsData>

export type TopicIdParams = z.infer<typeof topicIdSchema>

export type UpdateTopicData = z.infer<typeof updateTopicSchema>
export type UpdateTopicRequest = Request<TopicIdParams, AnyObject, UpdateTopicData>
