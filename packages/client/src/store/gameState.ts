import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CellData {
  isRevealed: boolean
  isMine: boolean
  isFlagged: boolean
  surroundingMines: number // Number of mines connected to the cell (3x3 around)
}
export interface GameState {
  field: CellData[][]
  minesRevealed: number
  minesLeft: number
  status: 'idle' | 'playing' | 'won' | 'lost'
  startTime: number
  finishTime: number | undefined
  difficulty: 'beginner' | 'intermediate' | 'expert'
}

const initialState: GameState = {
  field: [],
  minesRevealed: 0,
  minesLeft: 0,
  status: 'idle',
  startTime: Date.now(),
  finishTime: undefined,
  difficulty: 'intermediate',
}

const gameState = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    changeStatus: (state, action: PayloadAction<GameState['status']>) => {
      state.status = action.payload
      if (action.payload !== 'playing' && action.payload !== 'idle') {
        state.finishTime = Date.now()
      }
    },

    createGame: (
      state,
      action: PayloadAction<Pick<GameState, 'field' | 'minesLeft'>>
    ) => {
      state.field = action.payload.field
      state.minesLeft = action.payload.minesLeft
      state.minesRevealed = 0
      state.status = 'playing'
      state.startTime = Date.now()
      state.finishTime = undefined
    },

    updateField: (
      state,
      action: PayloadAction<
        Pick<GameState, 'field' | 'status' | 'minesRevealed' | 'minesLeft'>
      >
    ) => {
      state.field = action.payload.field
      state.status = action.payload.status
      state.minesRevealed = action.payload.minesRevealed
      state.minesLeft = action.payload.minesLeft
      if (
        action.payload.status !== 'playing' &&
        action.payload.status !== 'idle'
      ) {
        state.finishTime = Date.now()
      }
    },

    updateDifficulty: (
      state,
      action: PayloadAction<GameState['difficulty']>
    ) => {
      state.status = 'idle'
      state.difficulty = action.payload
    },
  },
})

export const { changeStatus, createGame, updateField, updateDifficulty } =
  gameState.actions
export default gameState.reducer
