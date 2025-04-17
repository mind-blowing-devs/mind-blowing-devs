import type { Response } from 'express'
import type {
  CreateCommentRequest,
  DeleteCommentRequest,
  GetCommentsRequest,
} from '../types'

import { getErrorObject } from '../utils'
import { createComment, getComments, deleteComment } from '../services'

export const createCommentController = async (
  req: CreateCommentRequest,
  res: Response
) => {
  try {
    const comment = await createComment(req.body)
    return res.status(201).json(comment)
  } catch (error) {
    if ((error as Error).message === 'TOPIC_NOT_FOUND') {
      return res.status(404).json(getErrorObject('topic not found'))
    }
    return res.status(500).json(getErrorObject('error creating comment'))
  }
}

export const getCommentsController = async (
  req: GetCommentsRequest,
  res: Response
) => {
  try {
    const { topicId, offset, limit } = req.query

    const comments = await getComments({
      topicId,
      offset,
      limit,
    })

    return res.json(comments)
  } catch (error) {
    return res
      .status(500)
      .json(getErrorObject('Error fetching comments for topic'))
  }
}

export const deleteCommentController = async (
  req: DeleteCommentRequest,
  res: Response
) => {
  try {
    await deleteComment(req.params.commentId)

    return res.status(200).json({ message: 'comment and related data deleted' })
  } catch (error) {
    if ((error as Error).message === 'COMMENT_NOT_FOUND') {
      return res.status(404).json(getErrorObject('comment not found'))
    }
    if ((error as Error).message === 'TOPIC_NOT_FOUND') {
      return res.status(404).json(getErrorObject('topic not found'))
    }
    return res.status(500).json(getErrorObject('error deleting comment'))
  }
}
