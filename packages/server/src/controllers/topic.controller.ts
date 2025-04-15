import type { Request, Response } from 'express'
import * as topicService from '../services/topic.service'

export const getAllTopics = (_: Request, res: Response) => {
  const topics = topicService.getAll()
  res.json(topics)
}

export const getTopicById = (req: Request, res: Response) => {
  const id = Number(req.params.id)
  const topic = topicService.getById(id)
  if (!topic) {
    res.status(404).json({ message: 'Topic not found' })
    return
  }
  res.json(topic)
  return
}

export const createTopic = (req: Request, res: Response) => {
  const { title, author, description, category } = req.body
  const topic = topicService.create({ title, author, description, category })
  return res.status(201).json(topic)
}
