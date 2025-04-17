import type { Request, Response } from 'express'
import type {
  CreateTopicRequest,
  GetAllTopicsRequest,
  TopicIdParams,
  UpdateTopicRequest,
} from '../types'
import { handleError } from '../utils'
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
    return handleError(error, res, 'error creating topic')
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
    return handleError(error, res, 'error fetching topics')
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
    return handleError(error, res, 'error fetching topic')
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
    return handleError(error, res, 'error updating topic')
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
    return handleError(error, res, 'error deleting topic')
  }
}
