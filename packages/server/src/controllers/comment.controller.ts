import { Request, Response } from 'express'
import * as commentService from '../services/comment.service'

export const createComment = (req: Request, res: Response) => {
  const { topicId, body, authorId } = req.body
  const comment = commentService.create({ topicId, body, authorId })
  return res.status(201).json(comment)
}

export const updateComment = (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const { body } = req.body
  const updated = commentService.update(id, { body })
  if (!updated) return res.status(404).json({ message: 'Comment not found' })
  return res.json(updated)
}

export const deleteComment = (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const deleted = commentService.remove(id)
  if (!deleted) return res.status(404).json({ message: 'Comment not found' })
  return res.json({ message: 'Comment deleted' })
}
