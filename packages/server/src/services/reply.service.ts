import { Reply, Comment } from '../models'
import { sequelize } from '../db'
import { AddReplyData } from '../types'

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
