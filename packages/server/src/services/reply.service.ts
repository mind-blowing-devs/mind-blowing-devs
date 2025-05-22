import { Reply, Comment } from '../models'
import { sequelize } from '../db'
import { CreateReplyData, GetRepliesData } from '../types'
import { COMMENT_NOT_FOUND, REPLY_NOT_FOUND, PARENT_REPLY_NOT_FOUND } from '../constants'

export const createReply = async (data: CreateReplyData) => {
  const transaction = await sequelize.transaction()

  try {
    const { commentId, parentReplyId } = data
    let reply

    if (parentReplyId) {
      // reply to a reply
      const parentReply = await Reply.findByPk(parentReplyId, { transaction })

      if (!parentReply) {
        throw new Error(PARENT_REPLY_NOT_FOUND)
      }

      reply = await Reply.create(data, { transaction })

      parentReply.repliesCount += 1
      await parentReply.save({ transaction })
    } else {
      // reply to a comment
      if (!commentId) {
        throw new Error()
      }
      const comment = await Comment.findByPk(commentId, { transaction })

      if (!comment) {
        throw new Error(COMMENT_NOT_FOUND)
      }

      reply = await Reply.create(data, { transaction })

      comment.repliesCount += 1
      await comment.save({ transaction })
    }

    await transaction.commit()

    const replyData = reply.get({ plain: true })
    delete replyData.updatedAt

    return replyData
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

export const getReplies = async ({ commentId, parentReplyId, offset, limit }: GetRepliesData) => {
  const where = parentReplyId
    ? { parentReplyId } // if parentReplyId is provided, get replies to that reply
    : { commentId, parentReplyId: null } // if no parentReplyId, get top-level replies

  return await Reply.findAll({
    where,
    order: [['createdAt', 'ASC']],
    offset,
    limit,
    attributes: { exclude: ['updatedAt'] },
  })
}

export const deleteReply = async (replyId: string) => {
  const transaction = await sequelize.transaction()

  try {
    const reply = await Reply.findByPk(replyId, { transaction })

    if (!reply) {
      throw new Error(REPLY_NOT_FOUND)
    }

    const { parentReplyId, commentId } = reply

    await reply.destroy({ transaction })

    if (parentReplyId) {
      const parentReply = await Reply.findByPk(parentReplyId, { transaction })

      if (!parentReply) {
        throw new Error(PARENT_REPLY_NOT_FOUND)
      }

      await parentReply.update(
        {
          repliesCount: Math.max(0, parentReply.repliesCount - 1),
        },
        { transaction }
      )
    } else {
      const comment = await Comment.findByPk(commentId, { transaction })

      if (!comment) {
        throw new Error(COMMENT_NOT_FOUND)
      }

      await comment.update(
        {
          repliesCount: Math.max(0, comment.repliesCount - 1),
        },
        { transaction }
      )
    }

    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
