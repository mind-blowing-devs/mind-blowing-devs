/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Request, Response } from 'express'
import type { CreateTopicRequest } from '../types'
import { getErrorObject } from '../utils'
import {
  createTopic,
  getAllTopics,
  getTopicWithComments,
  updateTopicById,
  deleteTopicById,
} from '../services'

export const createTopicController = async (
  req: CreateTopicRequest,
  res: Response
) => {
  try {
    const topic = await createTopic(req.body)
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

export const getAllTopicsController = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10

    const { topics, pagination } = await getAllTopics(page, limit)

    return res.json({ topics, pagination })
  } catch (error) {
    return res.status(500).json(getErrorObject('Error fetching topics'))
  }
}

export const getTopicByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const topic = await getTopicWithComments(id)

    return res.json(topic)
  } catch (error) {
    if ((error as Error).message === 'Topic not found') {
      return res.status(404).json(getErrorObject('Topic not found'))
    }
    return res.status(500).json(getErrorObject('Error fetching topic'))
  }
}

export const updateTopicController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { title, description, category } = req.body

    const updatedTopic = await updateTopicById(id, {
      title,
      description,
      category,
    })

    return res.json(updatedTopic)
  } catch (error) {
    if ((error as any).name === 'SequelizeUniqueConstraintError') {
      return res
        .status(400)
        .json(getErrorObject('Topic with this title already exists'))
    }

    if ((error as Error).message === 'Topic not found') {
      return res.status(404).json(getErrorObject('Topic not found'))
    }
    return res.status(500).json(getErrorObject('Error updating topic'))
  }
}

export const deleteTopicController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    await deleteTopicById(id)

    return res.status(200).json({ message: 'Topic and related data deleted' })
  } catch (error) {
    if ((error as Error).message === 'Topic not found') {
      return res.status(404).json(getErrorObject('Topic not found'))
    }

    return res.status(500).json(getErrorObject('Error deleting topic'))
  }
}
