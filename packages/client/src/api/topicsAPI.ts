import { AxiosResponse } from 'axios'
import { $axiosTopics } from './baseAPI'

export type CommentsType = {
  author: string
  body: string
  createdAt: string
  id: string
  repliesCount: number
  topicId: string
}

export type ForumTopicDataType = {
  author: string
  category: string
  commentCount: number
  comments: CommentsType[]
  createdAt: string
  description: string
  id: string
  lastCommentAt: string
  title: string
}

export type ForumTopicsInfo = Omit<ForumTopicDataType, 'comments'>

type createTopicData = {
  title: string
  author: string
  description: string
  category: string
}

type createCommentData = {
  topicId: string
  body: string
  author: string
}

type ForumTopicsResponseType = {
  pagination: {
    limit: number
    page: number
    total: number
    totalPages: number
  }
  topics: ForumTopicsInfo[]
}

export const createTopic = async (data: createTopicData) => {
  return $axiosTopics.post('/topics', data)
}

export const getAllTopics = async (params: {
  page: number
  limit: number
}): Promise<AxiosResponse<ForumTopicsResponseType>> => {
  return $axiosTopics.get('/topics', {
    params: params,
  })
}

export const getTopicDetailed = async (id: string): Promise<AxiosResponse<ForumTopicDataType>> => {
  return $axiosTopics.get(`/topics/${id}`)
}

export const createTopicReply = async (data: createCommentData) => {
  return $axiosTopics.post('/comments', data)
}

export const deleteTopicReply = async (commentId: string) => {
  return $axiosTopics.delete(`/comments/${commentId}`)
}
