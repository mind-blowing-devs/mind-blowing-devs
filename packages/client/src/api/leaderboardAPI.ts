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
  async addUserToLeaderboard(
    data: GameData,
    ratingFieldName: string
  ): Promise<void> {
    return await this.api.post('/leaderboard', {
      data: data,
      ratingFieldName: ratingFieldName,
      teamName: TEAM_NAME,
    })
  }

  async getLeaderboard(
    data: Partial<GetLeaderboardData>
  ): Promise<LeaderboardData> {
    const result = await this.api.post('/leaderboard/all', data)
    return result.data
  }
}

export const leaderboardAPI = new LeaderboardAPI()
