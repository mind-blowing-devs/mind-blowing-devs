import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type Theme = {
  id: string
  name: string
  settings: string
}

type ThemeState = {
  themes: Theme[]
  selectedThemeId: string | null
}

const initialState: ThemeState = {
  themes: [],
  selectedThemeId: null,
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setThemes: (state, action: PayloadAction<Theme[]>) => {
      state.themes = action.payload
    },
    setSelectedThemeId: (state, action: PayloadAction<string>) => {
      const newTheme = state.themes.find(
        item => item.name === action.payload || item.id === action.payload
      )?.id

      if (newTheme) {
        state.selectedThemeId = newTheme
      }
    },
  },
})

export const { setThemes, setSelectedThemeId } = themeSlice.actions
export default themeSlice.reducer
