import { z } from 'zod'
import { ALL_AVAILABLE_EMOJIS, AvailableEmoji } from '../constants/emoji'

/**
 * Схема для валидации запроса на получение реакций
 */
export const getReactionsSchema = z.object({
  replyId: z.string().uuid({
    message: 'Reply ID must be a valid UUID',
  }),
})

/**
 * Схема для валидации запроса на добавление реакции
 */
export const addReactionSchema = z.object({
  replyId: z
    .string({
      required_error: 'Reply ID is required',
    })
    .uuid({
      message: 'Reply ID must be a valid UUID',
    }),
  emoji: z
    .string({
      required_error: 'Emoji is required',
    })
    .refine(
      (val): val is AvailableEmoji =>
        ALL_AVAILABLE_EMOJIS.includes(val as AvailableEmoji),
      {
        message: `Emoji must be one of: ${ALL_AVAILABLE_EMOJIS.join(', ')}`,
      }
    ),
})

/**
 * Схема для валидации запроса на удаление реакции
 */
export const removeReactionSchema = z.object({
  id: z.string().refine(val => !isNaN(parseInt(val)), {
    message: 'Reaction ID must be a number',
  }),
})

export type GetReactionsRequest = z.infer<typeof getReactionsSchema>
export type AddReactionRequest = z.infer<typeof addReactionSchema>
export type RemoveReactionRequest = z.infer<typeof removeReactionSchema>
