import { Comment, Topic } from '../models'
import type { CreateCommentData, GetCommentsData } from '../types'
import { sequelize } from '../db'
import { Op } from 'sequelize'
import { TOPIC_NOT_FOUND, COMMENT_NOT_FOUND } from '../constants'

export const createComment = async (data: CreateCommentData) => {
  const transaction = await sequelize.transaction()

  try {
    const topic = await Topic.findByPk(data.topicId, { transaction })
    if (!topic) {
      throw new Error(TOPIC_NOT_FOUND)
    }

    const comment = await Comment.create(data, { transaction })

    // update topic with new comment
    await topic.update(
      {
        commentCount: topic.commentCount + 1,
        lastCommentAt: comment.createdAt,
      },
      { transaction }
    )

    await transaction.commit()

    const commentData = comment.get({ plain: true })
    delete commentData.updatedAt

    return comment
  } catch (error) {
    await transaction.rollback()
    throw error
  }
}

export const getComments = async ({ topicId, offset, limit }: GetCommentsData) => {
  return await Comment.findAll({
    where: { topicId },
    order: [['createdAt', 'DESC']],
    offset,
    limit,
    attributes: { exclude: ['updatedAt'] },
  })
}

export const deleteComment = async (commentId: string) => {
  const transaction = await sequelize.transaction()

  try {
    const comment = await Comment.findByPk(commentId, { transaction })
    if (!comment) {
      throw new Error(COMMENT_NOT_FOUND)
    }

    const topicId = comment.topicId

    const lastComment = await Comment.findOne({
      where: { topicId, id: { [Op.ne]: commentId } }, // exclude the comment being deleted
      order: [['createdAt', 'DESC']],
      transaction,
    })

    await comment.destroy({ transaction })

    const topic = await Topic.findByPk(topicId, { transaction })
    if (!topic) {
      throw new Error(TOPIC_NOT_FOUND)
    }

    await topic.update(
      {
        commentCount: Math.max(0, topic.commentCount - 1),
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
