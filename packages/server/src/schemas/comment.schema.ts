import { z } from 'zod'

export const createCommentSchema = z.object({
  topicId: z
    .string({
      required_error: 'topicId is required',
    })
    .uuid({ message: 'invalid topicId format' }),
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
  topicId: z.string().uuid({ message: 'invalid topicId format' }),
  offset: z.coerce.number().default(0),
  limit: z.coerce.number().default(10),
})

export const commentIdSchema = z.object({
  commentId: z.string().uuid({ message: 'invalid commentId format' }),
})
