import { useEffect } from 'react'
import { leaderboardAPI } from '../api'

export const useLeaderboardSync = () => {
  useEffect(() => {
    const syncLeaderboard = async () => {
      const raw = localStorage.getItem('pendingLeaderboard')

      if (!raw) {
        return
      }

      const { data, ratingFieldName } = JSON.parse(raw)

      try {
        await leaderboardAPI.addUserToLeaderboard(data, ratingFieldName)
        localStorage.removeItem('pendingLeaderboard')
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
