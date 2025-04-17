import type { Request, Response } from 'express'
import type { CreateReplyRequest, GetRepliesRequest } from '../types'
import { handleError } from '../utils'
import { createReply, deleteReply, getReplies } from '../services'

export const createReplyController = async (
  req: CreateReplyRequest,
  res: Response
) => {
  try {
    const reply = await createReply(req.body)
    return res.status(201).json(reply)
  } catch (error) {
    return handleError(error, res, 'error creating reply')
  }
}

export const getRepliesController = async (
  req: GetRepliesRequest,
  res: Response
) => {
  try {
    const replies = await getReplies(req.query)
    return res.json(replies)
  } catch (error) {
    return handleError(error, res, 'error getting replies')
  }
}

export const deleteReplyController = async (
  req: Request<{ replyId: string }>,
  res: Response
) => {
  try {
    await deleteReply(req.params.replyId)
    return res.status(204).send()
  } catch (error) {
    return handleError(error, res, 'error deleting reply')
  }
}
