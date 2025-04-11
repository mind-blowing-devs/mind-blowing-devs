import { configureStore } from '@reduxjs/toolkit'
import {
  type TypedUseSelectorHook,
  useSelector,
  useDispatch,
} from 'react-redux'
import gameState from './gameState'
import themeReducer from './themeSlice'
import fullScreenReducer from './fullscreenSlice'
import userReducer from './userSlice'

const store = configureStore({
  reducer: {
    gameState: gameState,
    theme: themeReducer,
    fullScreen: fullScreenReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
