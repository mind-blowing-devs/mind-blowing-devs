import { combineReducers, configureStore } from '@reduxjs/toolkit'
import {
  type TypedUseSelectorHook,
  useSelector,
  useDispatch,
  useStore as useStoreBase,
} from 'react-redux'
import gameState from './gameState'
import themeReducer from './themeSlice'
import fullScreenReducer from './fullscreenSlice'
import userReducer from './userSlice'
import ssrReducer from './ssrSlice'

declare global {
  interface Window {
    REDUX_INITIAL_STATE: RootState | undefined
  }
}

// root reducer
export const reducer = combineReducers({
  gameState: gameState,
  theme: themeReducer,
  fullScreen: fullScreenReducer,
  user: userReducer,
  ssr: ssrReducer,
})

const store = configureStore({
  reducer,
  preloadedState:
    typeof window !== 'undefined' && window.REDUX_INITIAL_STATE
      ? window.REDUX_INITIAL_STATE
      : undefined,
})

if (typeof window !== 'undefined') {
  delete window.REDUX_INITIAL_STATE
}

export type RootState = ReturnType<typeof reducer>
export type AppDispatch = typeof store.dispatch

// Typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useStore: () => typeof store = useStoreBase

export default store
