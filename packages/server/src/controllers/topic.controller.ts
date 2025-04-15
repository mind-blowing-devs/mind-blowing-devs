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

export const createTopic = async (req: Request, res: Response) => {
  try {
    const { title, author, description, category } = req.body
    const topic = await topicService.create({
      title,
      author,
      description,
      category,
    })
    return res.status(201).json(topic)
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((error as any).name === 'SequelizeUniqueConstraintError') {
      return res
        .status(400)
        .json({ reason: 'Topic with this title already exists' })
    }

    return res.status(500).json({
      message: 'Error during topic creation',
      error: (error as Error).message,
    })
  }
}
