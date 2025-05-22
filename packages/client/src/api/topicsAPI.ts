import { AxiosResponse } from 'axios'
import { $axios } from './baseAPI'

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
  return $axios.post('/topics', data)
}

export const getAllTopics = async (params: {
  page: number
  limit: number
}): Promise<AxiosResponse<ForumTopicsResponseType>> => {
  return $axios.get('/topics', {
    params: params,
  })
}

export const getTopicDetailed = async (id: string): Promise<AxiosResponse<ForumTopicDataType>> => {
  return $axios.get(`/topics/${id}`)
}

export const createTopicReply = async (data: createCommentData) => {
  return $axios.post('/comments', data)
}

export const deleteTopicReply = async (commentId: string) => {
  return $axios.delete(`/comments/${commentId}`)
}
