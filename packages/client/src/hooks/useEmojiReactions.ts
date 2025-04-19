import { useState, useEffect } from 'react'
import { reactionAPI, EmojiReaction, AddReactionRequest } from '../api/reactionAPI'

interface IUseEmojiReactions {
  replyId: number
}

interface IUseEmojiReactionsReturn {
  reactions: EmojiReaction[]
  isLoading: boolean
  error: Error | null
  addReaction: (emoji: string) => Promise<void>
  removeReaction: (reactionId: number) => Promise<void>
}

/**
 * Хук для работы с эмодзи-реакциями на ответы
 */
export const useEmojiReactions = ({ replyId }: IUseEmojiReactions): IUseEmojiReactionsReturn => {
  const [reactions, setReactions] = useState<EmojiReaction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchReactions = async () => {
    if (!replyId) return

    setIsLoading(true)
    setError(null)

    try {
      const fetchedReactions = await reactionAPI.getReactions(replyId)

      // Преобразуем данные из API в формат для UI
      const formattedReactions: EmojiReaction[] = fetchedReactions.map(reaction => ({
        id: reaction.id,
        emoji: reaction.emoji,
        count: reaction.count,
      }))

      setReactions(formattedReactions)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch reactions'))
      console.error('Failed to fetch reactions:', err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchReactions()
  }, [replyId])

  const addReaction = async (emoji: string) => {
    if (!replyId) return

    try {
      const request: AddReactionRequest = {
        replyId,
        emoji,
      }

      const response = await reactionAPI.addReaction(request)

      if (response) {
        // Обновляем состояние реакций после успешного API-вызова
        setReactions(prevReactions => {
          const existingReactionIndex = prevReactions.findIndex(
            reaction => reaction.emoji === emoji
          )

          if (existingReactionIndex >= 0) {
            // Обновляем существующую реакцию
            const updatedReactions = [...prevReactions]
            updatedReactions[existingReactionIndex] = {
              ...updatedReactions[existingReactionIndex],
              count: updatedReactions[existingReactionIndex].count + 1,
              id: response.id,
            }
            return updatedReactions
          } else {
            // Добавляем новую реакцию
            return [
              ...prevReactions,
              {
                id: response.id,
                emoji,
                count: 1,
              },
            ]
          }
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add reaction'))
      console.error('Failed to add reaction:', err)
    }
  }

  const removeReaction = async (reactionId: number) => {
    if (!reactionId) return

    try {
      const success = await reactionAPI.removeReaction(reactionId)

      if (success) {
        // Удаляем реакцию из состояния
        setReactions(prevReactions => prevReactions.filter(reaction => reaction.id !== reactionId))
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to remove reaction'))
      console.error('Failed to remove reaction:', err)
    }
  }

  return {
    reactions,
    isLoading,
    error,
    addReaction,
    removeReaction,
  }
}
