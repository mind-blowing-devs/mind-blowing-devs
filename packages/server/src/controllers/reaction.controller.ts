import type { Response } from 'express'
import { handleError } from '../utils'
import {
  getReactionsForReply,
  getUserReactionsForReply,
  addReaction,
  removeReaction,
} from '../services/reaction.service'
import {
  GetReactionsRequest,
  AddReactionRequest,
  RemoveReactionRequest,
} from '../types/reaction.types'
import { REACTION_NOT_FOUND, UNAUTHORIZED_REACTION_REMOVAL } from '../constants'

interface IFormattedReaction {
  emoji: string
  count: number
  id?: number
  userReacted: boolean
}

/**
 * Получение всех реакций для конкретного ответа
 */
export const getReactionsController = async (req: GetReactionsRequest, res: Response) => {
  try {
    const { replyId } = req.query

    if (!replyId) {
      return res.status(400).json({ error: 'Reply ID is required' })
    }

    // Получаем все реакции
    const reactions = await getReactionsForReply(replyId)

    const userReactions = req.user?.id ? await getUserReactionsForReply(replyId, req.user.id) : []

    // Форматируем результат для клиента
    const formattedReactions: IFormattedReaction[] = reactions.map(reaction => {
      const emoji = reaction.emoji
      const count = Number(reaction.count)

      const userReaction = userReactions.find(ur => ur.emoji === emoji)

      return {
        emoji,
        count,
        id: userReaction?.id,
        userReacted: !!userReaction,
      }
    })

    return res.json(formattedReactions)
  } catch (error) {
    return handleError(error, res, 'error getting reactions')
  }
}

/**
 * Добавление реакции к комментарию
 */
export const addReactionController = async (req: AddReactionRequest, res: Response) => {
  try {
    const { replyId, emoji } = req.body

    if (!replyId || !emoji) {
      return res.status(400).json({ error: 'reply ID and emoji are required' })
    }

    const userId = req.user?.id || 0

    const newReaction = await addReaction(replyId, userId, emoji)

    return res.status(201).json({
      id: newReaction.id,
      emoji: newReaction.emoji,
      count: 1,
      userReacted: true,
    })
  } catch (error) {
    return handleError(error, res, 'error adding reaction')
  }
}

/**
 * Удаление реакции эмодзи
 */
export const removeReactionController = async (req: RemoveReactionRequest, res: Response) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ error: 'Reaction ID is required' })
    }

    const userId = req.user?.id || 0

    try {
      await removeReaction(Number(id), userId)
      return res.json({ success: true })
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === REACTION_NOT_FOUND) {
          return res.status(404).json({ error: 'Reaction not found' })
        }
        if (error.message === UNAUTHORIZED_REACTION_REMOVAL) {
          return res.status(403).json({ error: 'You can only remove your own reactions' })
        }
      }
      throw error
    }
  } catch (error) {
    return handleError(error, res, 'error removing reaction')
  }
}
