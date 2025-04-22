import { Reaction } from '../models/reaction.model'
import { sequelize } from '../db'
import { REACTION_NOT_FOUND, UNAUTHORIZED_REACTION_REMOVAL } from '../constants'

export interface ReactionWithCount {
  emoji: string
  count: string
}

/**
 * Получение всех реакций для конкретного ответа
 */
export const getReactionsForReply = async (
  replyId: string
): Promise<ReactionWithCount[]> => {
  const reactions = (await Reaction.findAll({
    attributes: [
      'emoji',
      [sequelize.fn('COUNT', sequelize.col('emoji')), 'count'],
    ],
    where: { replyId },
    group: ['emoji'],
    raw: true,
  })) as unknown as ReactionWithCount[]

  return reactions
}

/**
 * Получение реакций пользователя для конкретного ответа
 */
export const getUserReactionsForReply = async (
  replyId: string,
  userId: number
) => {
  const userReactions = await Reaction.findAll({
    where: {
      replyId,
      userId,
    },
    raw: true,
  })

  return userReactions
}

/**
 * Добавление новой реакции
 */
export const addReaction = async (
  replyId: string,
  userId: number,
  emoji: string
) => {
  const transaction = await sequelize.transaction()

  try {
    // Проверяем, есть ли уже такая реакция от этого пользователя
    const existingReaction = await Reaction.findOne({
      where: {
        replyId,
        userId,
        emoji,
      },
      transaction,
    })

    if (existingReaction) {
      await transaction.commit()
      return existingReaction
    }

    // Создаем новую реакцию
    const newReaction = await Reaction.create(
      {
        replyId,
        userId,
        emoji,
      },
      { transaction }
    )

    await transaction.commit()
    return newReaction
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

/**
 * Удаление реакции
 */
export const removeReaction = async (reactionId: number, userId: number) => {
  const transaction = await sequelize.transaction()

  try {
    const reaction = await Reaction.findByPk(reactionId, { transaction })

    if (!reaction) {
      await transaction.rollback()
      throw new Error(REACTION_NOT_FOUND)
    }

    if (reaction.userId !== userId) {
      await transaction.rollback()
      throw new Error(UNAUTHORIZED_REACTION_REMOVAL)
    }

    await reaction.destroy({ transaction })
    await transaction.commit()
    return true
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
