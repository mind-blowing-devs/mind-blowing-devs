import type { Comment } from './comment.model'

export interface Topic {
  id: number
  title: string
  description: string
  category?: string
  author: string
  createdAt: Date
  comments: Comment[]
}
