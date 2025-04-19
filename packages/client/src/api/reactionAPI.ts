import { $axios } from './baseAPI'
import { MockReactionService } from './mockReactionService'

/**
 * Тип для объекта реакции эмодзи
 */
export type EmojiReaction = {
  id?: number
  emoji: string
  count: number
  userId?: number
  userReacted?: boolean
}

/**
 * Тип для запроса на добавление реакции эмодзи
 */
export type AddReactionRequest = {
  replyId: number
  emoji: string
  userId?: number
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

//TODO: Это временное решение, пока нет бэкенда, только для тестирования.
// Флаг для переключения между моковыми данными и реальным API
const USE_MOCK = true

class ReactionAPI {
  //Получить все реакции для конкретного ответа
  async getReactions(replyId: number): Promise<EmojiReaction[]> {
    if (USE_MOCK) {
      return MockReactionService.getReactions(replyId)
    }

    try {
      const response = await $axios.get(`/reactions?replyId=${replyId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching reactions:', error)
      return []
    }
  }

  // Добавить реакцию эмодзи к ответу
  async addReaction(data: AddReactionRequest): Promise<EmojiReaction | null> {
    if (USE_MOCK) {
      return MockReactionService.addReaction(data)
    }

    try {
      const response = await $axios.post('/reactions', data)
      return response.data
    } catch (error) {
      console.error('Error adding reaction:', error)
      return null
    }
  }

  // Удалить реакцию
  async removeReaction(reactionId: number): Promise<boolean> {
    if (USE_MOCK) {
      return MockReactionService.removeReaction(reactionId)
    }

    try {
      await $axios.delete(`/reactions/${reactionId}`)
      return true
    } catch (error) {
      console.error('Error removing reaction:', error)
      return false
    }
  }
}

export const reactionAPI = new ReactionAPI()
