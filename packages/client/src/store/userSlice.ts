import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { userAPI, type User } from '../api'

export type UserAchievements = {
  gamesPlayed: number
  gamesWon: number
  gameData: Record<string, number>
}

type UserState = {
  user: User | null
  achievements: UserAchievements
}

const defaultAchievements: UserAchievements = {
  gamesPlayed: 0,
  gamesWon: 0,
  gameData: {},
}

const initialState: UserState = {
  user: null,
  achievements: defaultAchievements,
}

export const changeAvatar = createAsyncThunk(
  'user/changeAvatar',
  async (data: FormData, { rejectWithValue }) => {
    try {
      const user = await userAPI.changeAvatar(data)
      return user
    } catch (error) {
      return rejectWithValue('Error durring avatar change')
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User | null>) => {
      state.user = payload

      if (!payload) {
        return
      }

      const { login } = payload
      const stored = localStorage.getItem(login)

      if (stored) {
        state.achievements = JSON.parse(stored)
      } else {
        localStorage.setItem(login, JSON.stringify(defaultAchievements))
      }
    },

    updateAchievements(
      state,
      action: PayloadAction<{
        ratingFieldName: string
        currentResult: number
      }>
    ) {
      const { ratingFieldName, currentResult } = action.payload
      state.achievements.gameData[ratingFieldName] = currentResult
      state.achievements.gamesPlayed += 1
      state.achievements.gamesWon += 1

      const login = state.user?.login
      if (login) {
        localStorage.setItem(login, JSON.stringify(state.achievements))
      }
    },

    increasePlayedGamesCount(state) {
      state.achievements.gamesPlayed += 1

      const login = state.user?.login
      if (login) {
        localStorage.setItem(login, JSON.stringify(state.achievements))
      }
    },
  },
  extraReducers: builder =>
    builder.addCase(changeAvatar.fulfilled, (state, action) => {
      state.user = action.payload
    }),
})

export const { setUser, updateAchievements, increasePlayedGamesCount } =
  userSlice.actions
export default userSlice.reducer
