import { z } from 'zod'
import { Topic } from '../models/topic.model'

export const createCommentSchema = z.object({
  topicId: z
    .string({
      required_error: 'topicId is required',
    })
    .uuid({ message: 'invalid topicId format' })
    .refine(
      async id => {
        try {
          const topic = await Topic.findByPk(id)
          return !!topic
        } catch (error) {
          return false
        }
      },
      { message: 'topic does not exist' }
    ),
  author: z
    .string({
      required_error: 'author is required',
    })
    .min(1, 'author cannot be empty'),
  body: z
    .string({
      required_error: 'body is required',
    })
    .min(1, 'body cannot be empty'),
})

export const getCommentsSchema = z.object({
  topicId: z
    .string({
      required_error: 'topicId is required',
    })
    .uuid({ message: 'invalid topicId format' })
    .refine(
      async id => {
        try {
          const topic = await Topic.findByPk(id)
          return !!topic
        } catch (error) {
          return false
        }
      },
      { message: 'topic does not exist' }
    ),
  offset: z.coerce.number().default(0),
  limit: z.coerce.number().default(10),
})
