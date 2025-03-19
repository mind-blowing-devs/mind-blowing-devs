import { configureStore } from '@reduxjs/toolkit'
import {
  type TypedUseSelectorHook,
  useSelector,
  useDispatch,
} from 'react-redux'
import gameState from './gameState'
import themeReducer from './themeSlice'
import fullScreenReducer from './fullscreenSlice'

const store = configureStore({
  reducer: {
    gameState: gameState,
    theme: themeReducer,
    fullScreen: fullScreenReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Typed hooks
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
