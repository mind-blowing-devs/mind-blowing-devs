import { $axiosTopics } from './baseAPI'

/**
 * Тип для объекта реакции эмодзи
 */
export type EmojiReaction = {
  id?: number
  emoji: string
  count: number
  userReacted?: boolean
}

/**
 * Тип для запроса на добавление реакции эмодзи
 */
export type AddReactionRequest = {
  replyId: string
  emoji: string
}

/**
 * Тип для ответа API с реакциями
 */
export type ReactionsResponse = {
  reactions: EmojiReaction[]
  total: number
}

export enum AvailableEmoji {
  Thumbsup = '👍',
  Thumbsdown = '👎',
  Smile = '😄',
  Surprised = '😮',
  Sad = '😢',
  Heart = '❤️',
}

export const ALL_AVAILABLE_EMOJIS = Object.values(AvailableEmoji)

class ReactionAPI {
  //Получить все реакции для конкретного ответа
  async getReactions(replyId: string): Promise<EmojiReaction[]> {
    try {
      const response = await $axiosTopics.get(`/reactions?replyId=${replyId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching reactions:', error)
      return []
    }
  }

  // Добавить реакцию эмодзи к ответу
  async addReaction(data: AddReactionRequest): Promise<EmojiReaction | null> {
    try {
      const response = await $axiosTopics.post('/reactions', data)
      return response.data
    } catch (error) {
      console.error('Error adding reaction:', error)
      return null
    }
  }

  // Удалить реакцию
  async removeReaction(reactionId: number): Promise<boolean> {
    try {
      await $axiosTopics.delete(`/reactions/${reactionId}`)
      return true
    } catch (error) {
      console.error('Error removing reaction:', error)
      return false
    }
  }
}

export const reactionAPI = new ReactionAPI()
