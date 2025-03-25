import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import { userAPI, type User } from '../api'

type UserState = {
  user: User | null
}

const initialState: UserState = {
  user: null,
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
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
    },
  },
  extraReducers: builder =>
    builder.addCase(changeAvatar.fulfilled, (state, action) => {
      state.user = action.payload
    }),
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
