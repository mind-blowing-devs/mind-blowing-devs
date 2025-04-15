import { Topic } from '../models/topic.model'

export type CreateTopicData = {
  title: string
  description: string
  category?: string
  author: string
}

const topics: Topic[] = [
  {
    id: 1,
    title: 'First Topic',
    description: 'Loremg fgdjfgdkgdk',
    category: 'General',
    author: 'John Doe',
    createdAt: new Date(),
    comments: [],
  },
  {
    id: 2,
    title: 'Second Topic',
    description: 'Loremg fgdjfgdkgdk',
    category: 'General',
    author: 'Jane Doe',
    createdAt: new Date(),
    comments: [],
  },
]
let idCounter = 1

export const getAll = () => topics

export const getById = (id: number) => topics.find(t => t.id === id)

export const create = (data: CreateTopicData) => {
  const topic: Topic = {
    id: idCounter++,
    ...data,
    category: data.category || 'General',
    createdAt: new Date(),
    comments: [],
  }
  topics.push(topic)
  return topic
}
