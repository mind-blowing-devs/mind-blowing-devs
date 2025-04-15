import type { Reply } from '../models/reply.model'

const replies: Reply[] = []
let idCounter = 1

export const create = (data: {
  commentId: number
  body: string
  authorId: number
}) => {
  const reply = {
    id: idCounter++,
    ...data,
    createdAt: new Date(),
  }
  replies.push(reply)
  return reply
}

export const update = (id: number, data: { body?: string }) => {
  const reply = replies.find(r => r.id === id)
  if (!reply) return null
  Object.assign(reply, data, { updatedAt: new Date() })
  return reply
}

export const remove = (id: number) => {
  const index = replies.findIndex(r => r.id === id)
  if (index === -1) return false
  replies.splice(index, 1)
  return true
}
