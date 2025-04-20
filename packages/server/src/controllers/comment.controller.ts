import type { Response } from 'express'
import type {
  CreateCommentRequest,
  DeleteCommentRequest,
  GetCommentsRequest,
} from '../types'
import { handleError } from '../utils'
import { createComment, getComments, deleteComment } from '../services'

export const createCommentController = async (
  req: CreateCommentRequest,
  res: Response
) => {
  try {
    const comment = await createComment(req.body)
    return res.status(201).json(comment)
  } catch (error) {
    return handleError(error, res, 'error creating comment')
  }
}

export const getCommentsController = async (
  req: GetCommentsRequest,
  res: Response
) => {
  try {
    const comments = await getComments(req.query)
    return res.json(comments)
  } catch (error) {
    return handleError(error, res, 'error fetching comments')
  }
}

export const deleteCommentController = async (
  req: DeleteCommentRequest,
  res: Response
) => {
  try {
    await deleteComment(req.params.commentId)
    return res.status(204).send()
  } catch (error) {
    return handleError(error, res, 'error deleting comment')
  }
}
