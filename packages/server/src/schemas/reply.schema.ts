import { z } from 'zod'

export const createReplySchema = z.object({
  commentId: z
    .string({
      required_error: 'commentId is required',
    })
    .uuid({ message: 'invalid topicId format' }),
  parentId: z
    .string()
    .nullable()
    .refine(val => val === null || z.string().uuid().safeParse(val).success, {
      message: 'parentId must be a valid UUID or null',
    }),
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
