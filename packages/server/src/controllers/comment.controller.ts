import type { Request, Response } from 'express'
import { Comment } from '../models/comment.model'
import { Topic } from '../models/topic.model'
import { getErrorObject } from '../utils'
import { sequelize } from '../db'

export const createComment = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction()
  try {
    const { topicId, body, author } = req.body

    const comment = await Comment.create(
      {
        topicId,
        body,
        author,
      },
      { transaction }
    )

    await Topic.increment('commentCount', {
      by: 1,
      where: { id: topicId },
      transaction,
    })
    await Topic.update(
      { lastCommentAt: new Date() },
      { where: { id: topicId }, transaction }
    )

    await transaction.commit()
    return res.status(201).json(comment)
  } catch (error) {
    await transaction.rollback()
    return res.status(500).json(getErrorObject('Error creating comment'))
  }
}

export const getComments = async (req: Request, res: Response) => {
  try {
    const { topicId, offset, limit } = req.query

    const comments = await Comment.findAll({
      where: { topicId },
      order: [['createdAt', 'DESC']],
      offset: parseInt(offset as string, 10),
      limit: parseInt(limit as string, 10),
    })

    return res.json(comments)
  } catch (error) {
    return res
      .status(500)
      .json(getErrorObject('Error fetching comments for topic'))
  }
}
