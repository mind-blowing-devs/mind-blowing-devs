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

export const getRepliesSchema = z
  .object({
    commentId: z.string().uuid().optional(),
    parentId: z.string().uuid().optional(),
    offset: z.coerce.number().min(0).default(0),
    limit: z.coerce.number().min(1).default(10),
  })
  .superRefine((data, ctx) => {
    const hasCommentId = !!data.commentId
    const hasParentId = !!data.parentId

    if (!hasCommentId && !hasParentId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Either commentId or parentId must be provided',
        path: ['commentId'],
      })
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Either commentId or parentId must be provided',
        path: ['parentId'],
      })
    }

    if (hasCommentId && hasParentId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Provide only one of commentId or parentId, not both',
        path: ['commentId'],
      })
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Provide only one of commentId or parentId, not both',
        path: ['parentId'],
      })
    }
  })

export const replyIdSchema = z.object({
  replyId: z.string().uuid({ message: 'invalid replyId format' }),
})
