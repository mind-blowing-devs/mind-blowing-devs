import { Comment } from '../models'
import { z } from 'zod'

export const createReplySchema = z.object({
  commentId: z.coerce.number().refine(
    async id => {
      try {
        const comment = await Comment.findByPk(id)
        return !!comment
      } catch (error) {
        return false
      }
    },
    { message: 'comment does not exist' }
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
