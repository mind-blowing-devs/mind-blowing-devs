import { z } from 'zod'
import xss from 'xss'

export const createTopicSchema = z
  .object({
    title: z
      .string({
        required_error: 'title is required',
      })
      .min(1, { message: 'title must be at least 1 character' })
      .max(100, { message: 'title must be at most 100 characters' })
      .transform(val => xss(val.trim())),

    author: z
      .string({
        required_error: 'author is required',
      })
      .min(1, { message: 'author must be at least 1 character' })
      .max(50, { message: 'author must be at most 50 characters' })
      .transform(val => xss(val.trim())),

    description: z
      .string({
        required_error: 'description is required',
      })
      .min(1, { message: 'description must be at least 1 character' })
      .max(500, { message: 'description must be at most 500 characters' })
      .transform(val => xss(val.trim())),

    category: z
      .string()
      .min(1, 'category must be at least 1 character')
      .max(50, 'category must be at most 50 characters')
      .optional()
      .default('General')
      .transform(val => xss(val.trim())),
  })
  .strict()

export const getAllTopicsSchema = z
  .object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).default(10),
  })
  .strict()

export const updateTopicSchema = z
  .object({
    title: z
      .string()
      .min(1, { message: 'title must be at least 1 character' })
      .max(100, { message: 'title must be at most 100 characters' })
      .optional()
      .transform(val => (val ? xss(val.trim()) : val)),

    author: z
      .string()
      .min(1, { message: 'author must be at least 1 character' })
      .max(50, { message: 'author must be at most 50 characters' })
      .optional()
      .transform(val => (val ? xss(val.trim()) : val)),

    description: z
      .string()
      .min(1, { message: 'description must be at least 1 character' })
      .max(500, { message: 'description must be at most 500 characters' })
      .optional()
      .transform(val => (val ? xss(val.trim()) : val)),

    category: z
      .string()
      .min(1, 'category must be at least 1 character')
      .max(50, 'category must be at most 50 characters')
      .optional()
      .transform(val => (val ? xss(val.trim()) : val)),
  })
  .strict()
  .refine(data => Object.keys(data).length > 0, {
    message:
      'at least one field: title, author, description or category must be provided for update',
  })

export const topicIdSchema = z.object({
  id: z.string().uuid({ message: 'invalid topicId format' }),
})
