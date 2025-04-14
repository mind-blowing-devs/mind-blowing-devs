import { RootState } from '../store'
import { $axios } from './baseAPI'

export type Difficulty = RootState['gameState']['difficulty']

export type GameData = {
  [key: string]: number | string
  playerLogin: string
}

export type LeaderboardData = Array<{ data: GameData }>

export type GetLeaderboardData = {
  ratingFieldName: string
  cursor: number
  limit: number
}

export const TEAM_NAME = 'mbd'

// Creating unique field for team
export const getRatingFieldName = (level: Difficulty): string => {
  return TEAM_NAME + level
}

export const addUserToLeaderboard = async (
  gameData: GameData,
  field: string
): Promise<void> => {
  await $axios.post('/leaderboard', {
    data: gameData,
    ratingFieldName: field,
    teamName: TEAM_NAME,
  })
}

export const getLeaderboard = async (
  data: Partial<GetLeaderboardData>,
  signal?: AbortSignal
): Promise<LeaderboardData> => {
  const result = await $axios.post('/leaderboard/all', data, { signal })
  return result.data
}
