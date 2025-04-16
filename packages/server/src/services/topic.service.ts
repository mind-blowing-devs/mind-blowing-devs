import type { CreateTopicData, UpdateTopicData } from '../types'
import { Topic, Comment } from '../models'
import { getPaginationData } from '../utils'

export const createTopic = async (data: CreateTopicData) => {
  const topic = await Topic.create({
    title: data.title,
    description: data.description,
    author: data.author,
    category: data.category || 'General',
  })

  return topic
}

export const getAllTopics = async (page = 1, limit = 10) => {
  const offset = (page - 1) * limit

  const { rows: topics, count: total } = await Topic.findAndCountAll({
    offset,
    limit,
    order: [['title', 'DESC']],
  })

  const pagination = getPaginationData(total, page, limit)

  return { topics, pagination }
}

export const getTopicWithComments = async (id: string) => {
  const topic = await Topic.findByPk(id)

  if (!topic) {
    throw new Error('Topic not found')
  }

  const comments = await Comment.findAll({
    where: { topicId: id },
    order: [['createdAt', 'DESC']],
    limit: 10,
  })

  return { topic, comments }
}

export const updateTopicById = async (id: string, data: UpdateTopicData) => {
  const topic = await Topic.findByPk(id)

  if (!topic) {
    throw new Error('Topic not found')
  }

  await topic.update(data)

  return topic
}

export const deleteTopicById = async (id: string) => {
  const topic = await Topic.findByPk(id)

  if (!topic) {
    throw new Error('Topic not found')
  }

  await topic.destroy()
}
