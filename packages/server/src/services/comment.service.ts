import { Comment, Topic } from '../models'
import type { CreateCommentData, GetCommentsData } from '../types'
import { sequelize } from '../db'
import { Op } from 'sequelize'

export const createComment = async ({
  topicId,
  body,
  author,
}: CreateCommentData) => {
  const transaction = await sequelize.transaction()
  try {
    const topic = await Topic.findByPk(topicId, { transaction })
    if (!topic) {
      throw new Error('TOPIC_NOT_FOUND')
    }

    const comment = await Comment.create(
      {
        topicId,
        body,
        author,
      },
      { transaction }
    )

    await topic.update(
      { commentCount: topic.commentCount + 1, lastCommentAt: new Date() },
      { transaction }
    )

    await transaction.commit()
    return comment
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

export const getComments = async ({
  topicId,
  offset,
  limit,
}: GetCommentsData) => {
  const comments = await Comment.findAll({
    where: { topicId },
    order: [['createdAt', 'DESC']],
    offset,
    limit,
  })
  return comments
}

export const deleteComment = async (commentId: string) => {
  const transaction = await sequelize.transaction()

  try {
    const comment = await Comment.findByPk(commentId, { transaction })
    if (!comment) {
      throw new Error('COMMENT_NOT_FOUND')
    }

    const topicId = comment.topicId

    const lastComment = await Comment.findOne({
      where: { topicId, id: { [Op.ne]: commentId } }, // Op.ne — оператор "не равно"
      order: [['createdAt', 'DESC']],
      transaction,
    })

    await comment.destroy({ transaction })

    const topic = await Topic.findByPk(topicId, { transaction })
    if (!topic) {
      throw new Error('TOPIC_NOT_FOUND')
    }

    await topic.update(
      {
        commentCount: topic.commentCount - 1,
        lastCommentAt: lastComment ? lastComment.createdAt : null,
      },
      { transaction }
    )

    await transaction.commit()
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}
