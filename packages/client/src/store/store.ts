import { configureStore } from '@reduxjs/toolkit'
import gameState from './gameState'

const store = configureStore({
  reducer: {
    gameState: gameState,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
