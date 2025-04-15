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
})

export type CreateTopicInput = z.infer<typeof createTopicSchema>
