import type { Request, Response } from 'express'
import { Topic } from '../models/topic.model'
import { getErrorObject } from '../utils'

export const getAllTopics = async (_: Request, res: Response) => {
  try {
    const topics = await Topic.findAll({
      order: [['createdAt', 'DESC']],
    })

    return res.json(topics)
  } catch (error) {
    return res.status(500).json(getErrorObject('Error fetching topics'))
  }
}

export const getTopicById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    const topic = await Topic.findByPk(id)
    if (!topic) {
      res.status(404).json(getErrorObject('Topic not found'))
      return
    }
    return res.json(topic)
  } catch (error) {
    return res.status(500).json(getErrorObject('Error fetching topic'))
  }
}

export const createTopic = async (req: Request, res: Response) => {
  try {
    const { title, author, description, category } = req.body
    const topic = await Topic.create({
      title,
      description,
      author,
      category: category || 'General',
    })
    return res.status(201).json(topic)
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((error as any).name === 'SequelizeUniqueConstraintError') {
      return res
        .status(400)
        .json(getErrorObject('Topic with this title already exists'))
    }

    return res.status(500).json(getErrorObject('Error creating topic'))
  }
}
