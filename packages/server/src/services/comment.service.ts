import type { Comment } from '../models/comment.model'

const comments: Comment[] = []
let idCounter = 1

export const create = (data: {
  topicId: number
  body: string
  authorId: number
}) => {
  const comment = {
    id: idCounter++,
    ...data,
    createdAt: new Date(),
    replies: [],
  }
  comments.push(comment)
  return comment
}

export const update = (id: number, data: { body?: string }) => {
  const comment = comments.find(c => c.id === id)
  if (!comment) return null
  Object.assign(comment, data, { updatedAt: new Date() })
  return comment
}

export const remove = (id: number) => {
  const index = comments.findIndex(c => c.id === id)
  if (index === -1) return false
  comments.splice(index, 1)
  return true
}
