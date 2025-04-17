import { z } from 'zod'

export const createTopicSchema = z.object({
  title: z.string({
    required_error: 'title is required',
  }),
  author: z.string({
    required_error: 'author is required',
  }),
  description: z.string({
    required_error: 'description is required',
  }),
  category: z.string().optional().default('general'),
})

export const getAllTopicsSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).default(10),
})

export const updateTopicSchema = z
  .object({
    title: z.string().optional(),
    author: z.string().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
  })
  .refine(data => Object.keys(data).length > 0, {
    message:
      'at least one field: title, author, description or category must be provided for update',
  })

export const topicIdSchema = z.object({
  id: z.string().uuid({ message: 'invalid topicId format' }),
})
