import type { Request, Response } from 'express'
import { getErrorObject } from '../utils'
import { sequelize } from '../db'
import { Comment } from '../models/comment.model'
import { Reply } from '../models/reply.model'

export const createReply = async (req: Request, res: Response) => {
  const transaction = await sequelize.transaction()
  try {
    const { commentId, body, author } = req.body

    const reply = await Reply.create(
      {
        commentId,
        body,
        author,
      },
      { transaction }
    )

    await Comment.increment('repliesCount', {
      by: 1,
      where: { id: commentId },
      transaction,
    })

    await transaction.commit()
    return res.status(201).json(reply)
  } catch (error) {
    await transaction.rollback()
    return res.status(500).json(getErrorObject('Error adding reply'))
  }
}
