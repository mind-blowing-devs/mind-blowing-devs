import { BaseAPI } from './baseAPI'
import { RootState } from '../store'

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

export const TEAM_NAME = 'myTeam2'

// Creating unique field
export function getRatingFieldName(level: Difficulty): string {
  return TEAM_NAME + level
}

class LeaderboardAPI extends BaseAPI {
  async addUserToLeaderboard(gameData: GameData, field: string): Promise<void> {
    await this.api.post('/leaderboard', {
      data: gameData,
      ratingFieldName: field,
      teamName: TEAM_NAME,
    })
  }

  async getLeaderboard(
    data: Partial<GetLeaderboardData>,
    signal?: AbortSignal
  ): Promise<LeaderboardData> {
    const result = await this.api.post('/leaderboard/all', data, { signal })
    return result.data
  }
}

export const leaderboardAPI = new LeaderboardAPI()
