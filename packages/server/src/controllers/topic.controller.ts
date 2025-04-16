/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from 'express'
import { Topic, Comment } from '../models'
import { getErrorObject } from '../utils'

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
    if ((error as any).name === 'SequelizeUniqueConstraintError') {
      return res
        .status(400)
        .json(getErrorObject('Topic with this title already exists'))
    }

    return res.status(500).json(getErrorObject('Error creating topic'))
  }
}

export const getAllTopics = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const offset = (page - 1) * limit

    const { rows: topics, count: total } = await Topic.findAndCountAll({
      offset,
      limit,
      order: [['title', 'DESC']],
    })

    return res.json({
      topics,
      pagination: {
        total, // count of all topics
        page, // current page
        limit, // number of topics per page
        totalPages: Math.ceil(total / limit), // total number of pages
      },
    })
  } catch (error) {
    return res.status(500).json(getErrorObject('Error fetching topics'))
  }
}

export const getTopicById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const topic = await Topic.findByPk(id)
    if (!topic) {
      res.status(404).json(getErrorObject('Topic not found'))
      return
    }

    // get last 10 comments for the topic
    const comments = await Comment.findAll({
      where: { topicId: id },
      order: [['createdAt', 'DESC']],
      limit: 10,
    })

    return res.json({
      topic,
      comments,
    })
  } catch (error) {
    return res.status(500).json(getErrorObject('Error fetching topic'))
  }
}

export const updateTopic = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const topic = await Topic.findByPk(id)
    if (!topic) {
      res.status(404).json(getErrorObject('Topic not found'))
      return
    }

    const { title, description, category } = req.body

    await topic.update({
      title,
      description,
      category,
    })

    return res.json(topic)
  } catch (error) {
    if ((error as any).name === 'SequelizeUniqueConstraintError') {
      return res
        .status(400)
        .json(getErrorObject('Topic with this title already exists'))
    }
    return res.status(500).json(getErrorObject('Error updating topic'))
  }
}
export const deleteTopic = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const topic = await Topic.findByPk(id)

    if (!topic) {
      return res.status(404).json(getErrorObject('Topic not found'))
    }

    await topic.destroy()

    return res.status(200).json({ message: 'Topic and related data deleted' })
  } catch (error) {
    return res.status(500).json(getErrorObject('Error deleting topic'))
  }
}
