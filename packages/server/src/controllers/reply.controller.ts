import type { Response } from 'express'
import { getErrorObject } from '../utils'
import { createReply } from '../services'
import type { AddReplyRequest } from '../types'

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
    return res.status(500).json(getErrorObject('Error adding reply'))
  }
}
