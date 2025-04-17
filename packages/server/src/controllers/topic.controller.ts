import type { Request, Response } from 'express'
import type {
  CreateTopicRequest,
  GetAllTopicsRequest,
  TopicIdParams,
  UpdateTopicRequest,
} from '../types'
import { getErrorObject } from '../utils'
import {
  createTopic,
  getAllTopics,
  getTopicWithComments,
  updateTopicById,
  deleteTopicById,
} from '../services'
import { TOPIC_NOT_FOUND } from '../constants'

export const createTopicController = async (
  req: CreateTopicRequest,
  res: Response
) => {
  try {
    const topic = await createTopic(req.body)
    return res.status(201).json(topic)
  } catch (error) {
    if ((error as Error).name === 'SequelizeUniqueConstraintError') {
      return res
        .status(400)
        .json(getErrorObject('Topic with this title already exists'))
    }

    return res.status(500).json(getErrorObject('Error creating topic'))
  }
}

export const getAllTopicsController = async (
  req: GetAllTopicsRequest,
  res: Response
) => {
  try {
    const topicsWithPagination = await getAllTopics(req.query)
    return res.json(topicsWithPagination)
  } catch (error) {
    return res.status(500).json(getErrorObject('Error fetching topics'))
  }
}

export const getTopicByIdController = async (
  req: Request<TopicIdParams>,
  res: Response
) => {
  try {
    const topic = await getTopicWithComments(req.params.id)
    return res.json(topic)
  } catch (error) {
    if ((error as Error).message === TOPIC_NOT_FOUND) {
      return res.status(404).json(getErrorObject('Topic not found'))
    }
    return res.status(500).json(getErrorObject('Error fetching topic'))
  }
}

export const updateTopicController = async (
  req: UpdateTopicRequest,
  res: Response
) => {
  try {
    const updatedTopic = await updateTopicById(req.params.id, req.body)
    return res.json(updatedTopic)
  } catch (error) {
    if ((error as Error).name === 'SequelizeUniqueConstraintError') {
      return res
        .status(400)
        .json(getErrorObject('Topic with this title already exists'))
    }

    if ((error as Error).message === TOPIC_NOT_FOUND) {
      return res.status(404).json(getErrorObject('Topic not found'))
    }
    return res.status(500).json(getErrorObject('Error updating topic'))
  }
}

export const deleteTopicController = async (
  req: Request<TopicIdParams>,
  res: Response
) => {
  try {
    await deleteTopicById(req.params)
    return res.status(204).send()
  } catch (error) {
    if ((error as Error).message === TOPIC_NOT_FOUND) {
      return res.status(404).json(getErrorObject('Topic not found'))
    }

    return res.status(500).json(getErrorObject('Error deleting topic'))
  }
}
