import type { Reply } from './reply.model'

export interface Comment {
  id: number
  topicId: number
  body: string
  authorId: number
  createdAt: Date
  replies: Reply[]
}
