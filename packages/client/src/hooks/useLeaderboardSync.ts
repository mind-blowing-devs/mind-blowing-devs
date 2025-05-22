import { useEffect } from 'react'
import { addUserToLeaderboard } from '../api'

export const PENDING_LEADERBOARD_FIELD_NAME = 'pendingLeaderboard'

export const useLeaderboardSync = () => {
  useEffect(() => {
    const syncLeaderboard = async () => {
      const raw = localStorage.getItem(PENDING_LEADERBOARD_FIELD_NAME)

      if (!raw) {
        return
      }

      const { data, ratingFieldName } = JSON.parse(raw)

      try {
        await addUserToLeaderboard(data, ratingFieldName)
        localStorage.removeItem(PENDING_LEADERBOARD_FIELD_NAME)
      } catch (error) {
        console.error('Failed to sync leaderboard:', error)
      }
    }

    window.addEventListener('online', syncLeaderboard)

    if (navigator.onLine) {
      syncLeaderboard()
    }

    return () => window.removeEventListener('online', syncLeaderboard)
  }, [])
}
