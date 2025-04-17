import type { Response } from 'express'
import { getErrorObject } from '../utils'
import { createReply, deleteReply, getReplies } from '../services'
import type { AddReplyRequest, GetRepliesData } from '../types'

export const createReplyController = async (
  req: AddReplyRequest,
  res: Response
) => {
  try {
    const reply = await createReply({
      commentId: req.body.commentId,
      parentId: req.body.parentId,
      body: req.body.body,
      author: req.body.author,
    })
    return res.status(201).json(reply)
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === 'COMMENT_NOT_FOUND') {
        return res.status(404).json(getErrorObject('Comment not found'))
      }
      if (error.message === 'PARENT_REPLY_NOT_FOUND') {
        return res.status(404).json(getErrorObject('Parent reply not found'))
      }
    }
    return res.status(500).json(getErrorObject('Error adding reply'))
  }
}

export const getRepliesController = async (
  req: { query: GetRepliesData },
  res: Response
) => {
  try {
    const replies = await getReplies(req.query)
    return res.json(replies)
  } catch (error) {
    return res.status(500).json(getErrorObject('Error fetching replies'))
  }
}

export const deleteReplyController = async (
  req: { params: { replyId: string } },
  res: Response
) => {
  try {
    await deleteReply(req.params.replyId)
    return res.status(204).send()
  } catch (error) {
    return res.status(500).json(getErrorObject('Error deleting reply'))
  }
}
