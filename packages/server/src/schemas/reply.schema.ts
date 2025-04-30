import { z } from 'zod'
import xss from 'xss'

export const createReplySchema = z
  .object({
    commentId: z.string().uuid({ message: 'commentId must be a valid UUID' }).nullable().optional(),

    parentReplyId: z
      .string()
      .uuid({ message: 'parentReplyId must be a valid UUID' })
      .nullable()
      .optional(),

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
  .refine(data => data.commentId || data.parentReplyId, {
    message: 'Either commentId or parentReplyId must be provided',
  })
  .refine(data => !(data.commentId && data.parentReplyId), {
    message: 'Only one of commentId or parentReplyId must be provided',
  })

export const getRepliesSchema = z
  .object({
    commentId: z.string().uuid().optional(),
    parentReplyId: z.string().uuid().optional(),
    offset: z.coerce.number().min(0).default(0),
    limit: z.coerce.number().min(1).default(10),
  })
  .strict()
  .superRefine((data, ctx) => {
    const hasCommentId = !!data.commentId
    const hasParentReplyId = !!data.parentReplyId

    if (!hasCommentId && !hasParentReplyId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'commentId or parentReplyId must be provided',
      })
    }

    if (hasCommentId && hasParentReplyId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'provide only one of commentId or parentReplyId, not both',
      })
    }
  })

export const replyIdSchema = z.object({
  replyId: z.string().uuid({ message: 'invalid replyId format' }),
})
