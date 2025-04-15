import { z } from 'zod'

export const createCommentSchema = z.object({
  author: z.string({
    required_error: 'author is required',
  }),
  text: z.string({
    required_error: 'text is required',
  }),
})
