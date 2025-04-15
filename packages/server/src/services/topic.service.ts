/* eslint-disable @typescript-eslint/no-explicit-any */
import { Topic } from '../models/topic.model'

export type CreateTopicData = {
  title: string
  description: string
  category?: string
  author: string
}

export const getAll = async () => {
  const topics = await Topic.findAll({
    order: [['createdAt', 'DESC']],
  })

  return topics
}

export const getById = async (id: number) => {
  const topic = await Topic.findByPk(id)
  if (!topic) {
    return null
  }
  return topic
}

export const create = async (data: CreateTopicData) => {
  const topic = await Topic.create({
    title: data.title,
    description: data.description,
    author: data.author,
    category: data.category || 'General',
  })

  return topic
}
