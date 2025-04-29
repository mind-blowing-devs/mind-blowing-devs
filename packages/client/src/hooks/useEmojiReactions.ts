import { useState, useEffect, useCallback } from 'react'
import { reactionAPI, EmojiReaction, AddReactionRequest } from '../api/reactionAPI'

interface IUseEmojiReactions {
  replyId: string
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

  const fetchReactions = useCallback(async () => {
    if (!replyId) return

    setIsLoading(true)
    setError(null)

    try {
      const fetchedReactions = await reactionAPI.getReactions(replyId)
      setReactions(fetchedReactions)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch reactions'))
      console.error('Failed to fetch reactions:', err)
    } finally {
      setIsLoading(false)
    }
  }, [replyId])

  useEffect(() => {
    fetchReactions()
  }, [fetchReactions])

  const addReaction = useCallback(
    async (emoji: string) => {
      if (!replyId) return

      try {
        const request: AddReactionRequest = {
          replyId: replyId,
          emoji,
        }

        const response = await reactionAPI.addReaction(request)

        if (response) {
          // После успешного добавления реакции, обновляем список реакций
          await fetchReactions()
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to add reaction'))
        console.error('Failed to add reaction:', err)
      }
    },
    [replyId, fetchReactions]
  )

  const removeReaction = useCallback(
    async (reactionId: number) => {
      if (!reactionId) return

      try {
        const success = await reactionAPI.removeReaction(reactionId)

        if (success) {
          // После успешного удаления реакции, обновляем список реакций
          await fetchReactions()
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to remove reaction'))
        console.error('Failed to remove reaction:', err)
      }
    },
    [fetchReactions]
  )

  return {
    reactions,
    isLoading,
    error,
    addReaction,
    removeReaction,
  }
}
