import { Request, Response } from 'express'
import * as replyService from '../services/reply.service'

export const createReply = (req: Request, res: Response) => {
  const { commentId, body, authorId } = req.body
  const reply = replyService.create({ commentId, body, authorId })
  return res.status(201).json(reply)
}

export const updateReply = (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { body } = req.body
  const updated = replyService.update(id, { body })
  if (!updated) return res.status(404).json({ message: 'Reply not found' })
  return res.json(updated)
}

export const deleteReply = (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const deleted = replyService.remove(id)
  if (!deleted) return res.status(404).json({ message: 'Reply not found' })
  return res.json({ message: 'Reply deleted' })
}
