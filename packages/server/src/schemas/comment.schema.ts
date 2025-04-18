import { z } from 'zod'
import xss from 'xss'

export const createCommentSchema = z
  .object({
    topicId: z
      .string({
        required_error: 'topicId is required',
      })
      .uuid({ message: 'invalid topicId format' }),

    author: z
      .string({
        required_error: 'author is required',
      })
      .min(1, { message: 'author must be at least 1 character' })
      .max(50, { message: 'author must be at most 50 characters' })
      .transform(val => xss(val.trim())),

    body: z
      .string({
        required_error: 'body is required',
      })
      .min(1, { message: 'body must be at least 1 character' })
      .max(200, { message: 'body must be at most 200 characters' })
      .transform(val => xss(val.trim())),
  })
  .strict()

export const getCommentsSchema = z
  .object({
    topicId: z.string().uuid({ message: 'invalid topicId format' }),
    offset: z.coerce.number().min(0).default(0),
    limit: z.coerce.number().min(1).default(10),
  })
  .strict()

export const commentIdSchema = z.object({
  commentId: z.string().uuid({ message: 'invalid commentId format' }),
})
