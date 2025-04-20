import type {
  CreateTopicData,
  GetAllTopicsData,
  TopicIdParams,
  UpdateTopicData,
} from '../types'
import { Topic, Comment } from '../models'
import { getPaginationData } from '../utils'
import { TOPIC_NOT_FOUND } from '../constants'

export const createTopic = async (data: CreateTopicData) => {
  const topic = await Topic.create(data)

  const topicData = topic.get({ plain: true })
  delete topicData.updatedAt

  return topicData
}

export const getAllTopics = async ({ page, limit }: GetAllTopicsData) => {
  const offset = (page - 1) * limit

  const { rows: topics, count: total } = await Topic.findAndCountAll({
    offset,
    limit,
    order: [['title', 'DESC']],
    attributes: { exclude: ['updatedAt'] },
  })

  const pagination = getPaginationData(total, page, limit)

  return { topics, pagination }
}

export const getTopicWithComments = async (id: string) => {
  const topic = await Topic.findByPk(id, {
    include: [
      {
        model: Comment,
        where: { topicId: id },
        required: false,
        limit: 10,
        order: [['createdAt', 'DESC']],
        attributes: { exclude: ['updatedAt'] },
      },
    ],
    attributes: { exclude: ['updatedAt'] },
  })

  if (!topic) {
    throw new Error(TOPIC_NOT_FOUND)
  }

  return topic
}

export const updateTopicById = async (id: string, data: UpdateTopicData) => {
  const [affectedRows, [updatedTopic]] = await Topic.update(data, {
    where: { id },
    returning: true,
  })

  if (affectedRows === 0) {
    throw new Error(TOPIC_NOT_FOUND)
  }

  return updatedTopic
}

export const deleteTopicById = async ({ id }: TopicIdParams) => {
  const deletedCount = await Topic.destroy({
    where: { id },
  })

  if (deletedCount === 0) {
    throw new Error(TOPIC_NOT_FOUND)
  }
}
