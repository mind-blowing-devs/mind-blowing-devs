import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface CellData {
  isRevealed: boolean
  isMine: boolean
  isFlagged: boolean
  surroundingMines: number // Number of mines connected to the cell (3x3 around)
}

export interface Coordinates {
  x: number
  y: number
}

export interface GameState {
  field: CellData[][]
  hoveredCell: Coordinates | null
  minesRevealed: number
  minesLeft: number
  status: 'idle' | 'playing' | 'won' | 'lost'
  startTime: number
  finishTime: number | undefined
  difficulty: 'beginner' | 'intermediate' | 'expert'
  firstMoveMade: boolean
  scale: number
  translatePos: { x: number; y: number }
  cellSize: number
  isCanvasDraggable: boolean
}

const initialState: GameState = {
  field: [],
  hoveredCell: null,
  minesRevealed: 0,
  minesLeft: 0,
  status: 'idle',
  startTime: 0,
  finishTime: undefined,
  difficulty: 'beginner',
  firstMoveMade: false,
  scale: 1,
  translatePos: { x: 40, y: 40 },
  cellSize: 30,
  isCanvasDraggable: false,
}

const gameState = createSlice({
  name: 'gameState',
  initialState,
  reducers: {
    changeStatus: (state, action: PayloadAction<GameState['status']>) => {
      state.status = action.payload
      if (
        action.payload !== 'playing' &&
        action.payload !== 'idle' &&
        state.finishTime === undefined
      ) {
        state.finishTime = Date.now()
        state.hoveredCell = null
      }
    },

    createGame: (
      state,
      action: PayloadAction<Pick<GameState, 'field' | 'minesLeft'>>
    ) => {
      state.field = action.payload.field
      state.hoveredCell = null
      state.minesLeft = action.payload.minesLeft
      state.minesRevealed = 0
      state.status = 'playing'
      state.startTime = 0
      state.finishTime = undefined
      state.firstMoveMade = false
    },

    updateField: (
      state,
      action: PayloadAction<
        Pick<
          GameState,
          'field' | 'status' | 'minesRevealed' | 'minesLeft' | 'hoveredCell'
        >
      >
    ) => {
      state.field = action.payload.field
      state.status = action.payload.status
      state.minesRevealed = action.payload.minesRevealed
      state.minesLeft = action.payload.minesLeft
      state.hoveredCell = action.payload.hoveredCell
      if (
        action.payload.status !== 'playing' &&
        action.payload.status !== 'idle' &&
        state.finishTime === undefined
      ) {
        state.finishTime = Date.now()
      }
    },

    updateHover: (state, action: PayloadAction<GameState['hoveredCell']>) => {
      state.hoveredCell = action.payload
    },

    updateDifficulty: (
      state,
      action: PayloadAction<GameState['difficulty']>
    ) => {
      state.status = 'idle'
      state.difficulty = action.payload
      state.hoveredCell = null
    },

    setStartTime: (state, action: PayloadAction<number>) => {
      state.startTime = action.payload
      state.firstMoveMade = true
    },
    setScale: (state, action: PayloadAction<number>) => {
      state.scale = action.payload
    },
    setTranslatePos: (
      state,
      action: PayloadAction<GameState['translatePos']>
    ) => {
      state.translatePos = action.payload
    },
    setIsCanvasDraggable: (state, action: PayloadAction<boolean>) => {
      state.isCanvasDraggable = action.payload
    },
  },
})

export const {
  changeStatus,
  createGame,
  updateField,
  updateDifficulty,
  updateHover,
  setStartTime,
  setScale,
  setTranslatePos,
  setIsCanvasDraggable,
} = gameState.actions

export default gameState.reducer
