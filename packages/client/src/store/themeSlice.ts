import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type Theme = 'classic' | 'dark'

type ThemeState = {
  theme: Theme
}

const initialState: ThemeState = {
  theme: (globalThis.localStorage && (localStorage.getItem('theme') as Theme)) || 'classic',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload
    },
  },
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer
