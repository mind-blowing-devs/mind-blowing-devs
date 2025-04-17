import { Reply, Comment } from '../models'
import { sequelize } from '../db'
import { AddReplyData, GetRepliesData } from '../types'

export const createReply = async ({
  commentId,
  parentId,
  body,
  author,
}: AddReplyData) => {
  const transaction = await sequelize.transaction()

  try {
    const comment = await Comment.findByPk(commentId, { transaction })
    if (!comment) {
      throw new Error('COMMENT_NOT_FOUND')
    }

    let reply

    // check is it reply to comment or reply to reply
    if (parentId) {
      const parentReply = await Reply.findByPk(parentId, { transaction })
      if (!parentReply) {
        throw new Error('PARENT_REPLY_NOT_FOUND')
      }

      reply = await Reply.create(
        {
          commentId,
          parentId,
          body,
          author,
        },
        { transaction }
      )

      parentReply.repliesCount += 1
      await parentReply.save({ transaction })
    } else {
      reply = await Reply.create(
        {
          commentId,
          parentId,
          body,
          author,
        },
        { transaction }
      )

      comment.repliesCount += 1
      await comment.save({ transaction })
    }

    await transaction.commit()

    return reply
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

export const getReplies = async ({
  commentId,
  parentId,
  offset = 0,
  limit = 10,
}: GetRepliesData) => {
  const where = parentId
    ? { parentId } // if parentId is provided, get replies to that reply
    : { commentId, parentId: null } // if no parentId, get top-level replies

  const replies = await Reply.findAll({
    where,
    order: [['createdAt', 'ASC']],
    offset,
    limit,
  })

  const total = await Reply.count({ where })

  return {
    replies,
    pagination: {
      total,
      offset,
      limit,
      hasMore: offset + replies.length < total,
    },
  }
}

export const deleteReply = async (replyId: string) => {
  const transaction = await sequelize.transaction()

  try {
    const reply = await Reply.findByPk(replyId, { transaction })
    if (!reply) {
      throw new Error('REPLY_NOT_FOUND')
    }

    const { parentId, commentId } = reply

    await reply.destroy({ transaction })

    if (parentId) {
      const parentReply = await Reply.findByPk(parentId, { transaction })
      if (parentReply) {
        parentReply.repliesCount = Math.max(0, parentReply.repliesCount - 1)
        await parentReply.save({ transaction })
      }
    } else {
      const comment = await Comment.findByPk(commentId, { transaction })
      if (comment) {
        comment.repliesCount = Math.max(0, comment.repliesCount - 1)
        await comment.save({ transaction })
      }
    }

    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
