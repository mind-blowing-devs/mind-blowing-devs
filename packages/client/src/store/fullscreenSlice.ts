import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type IsFullscreen = boolean

type FullscreenState = {
  isFullscreen: IsFullscreen
}

const initialState: FullscreenState = {
  isFullscreen: Boolean(globalThis.document && document.fullscreenElement),
}

const fullScreenSlice = createSlice({
  name: 'fullScreen',
  initialState,
  reducers: {
    setIsFullScreen: (state, action: PayloadAction<IsFullscreen>) => {
      state.isFullscreen = action.payload
    },
    toggleFullScreen: state => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen()
        state.isFullscreen = true
      } else if (document.exitFullscreen) {
        document.exitFullscreen()
        state.isFullscreen = false
      }
    },
  },
})

export const { setIsFullScreen, toggleFullScreen } = fullScreenSlice.actions
export default fullScreenSlice.reducer
