import store from '../store/store'
import {
  RootState,
  createGame,
  updateField,
  updateDifficulty,
  updateHover,
  setStartTime,
} from '../store'
import GameEngine from './GameEngine'
import React from 'react'

type Difficulty = RootState['gameState']['difficulty']

export default class GameController {
  gameEngine: GameEngine

  constructor() {
    this.gameEngine = new GameEngine(0, 0, 0)

    this.generateGame()
  }

  generateGame(difficulty?: Difficulty) {
    let rows, cols, mines

    const storeDifficulty = store.getState().gameState.difficulty
    if (difficulty !== undefined && storeDifficulty !== difficulty) {
      store.dispatch(updateDifficulty(difficulty))
    }
    switch (difficulty ?? storeDifficulty) {
      case 'beginner':
        rows = 15
        cols = 15
        mines = 14
        break
      case 'expert':
        rows = 40
        cols = 40
        mines = 230
        break
      case 'intermediate':
      default:
        rows = 25
        cols = 25
        mines = 75
        break
    }

    this.gameEngine = new GameEngine(rows, cols, mines)
    store.dispatch(createGame(this.gameEngine.getState()))
  }

  handleCellClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { row, col } = this._getCellCoordinates(event)
    const gameState = store.getState().gameState

    // Если это первый ход, устанавливаем время начала
    if (!gameState.firstMoveMade) {
      store.dispatch(setStartTime(Date.now()))
    }

    store.dispatch(updateField(this.gameEngine.revealCell(row, col)))
  }

  handleRightClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    event.preventDefault()
    const { row, col } = this._getCellCoordinates(event)
    store.dispatch(updateField(this.gameEngine.toggleFlag(row, col)))
  }

  handleKeyDown = (event: React.KeyboardEvent<HTMLCanvasElement>) => {
    const shiftHover = (direction: 'down' | 'up' | 'right' | 'left') => {
      const newGameState = this.gameEngine.shiftHoverCell(direction)
      store.dispatch(updateHover(newGameState.hoveredCell))
    }
    const toggleFlag = (row: number, col: number) => {
      const newGameState = this.gameEngine.toggleFlag(row, col)
      store.dispatch(updateField(newGameState))
    }
    const revealCell = (row: number, col: number) => {
      const newGameState = this.gameEngine.revealCell(row, col)
      store.dispatch(updateField(newGameState))
    }
    event.preventDefault()

    switch (event.key) {
      case 'S':
      case 's':
      case 'ArrowDown':
        shiftHover('down')
        break
      case 'W':
      case 'w':
      case 'ArrowUp':
        shiftHover('up')
        break
      case 'A':
      case 'a':
      case 'ArrowLeft':
        shiftHover('left')
        break
      case 'D':
      case 'd':
      case 'ArrowRight':
        shiftHover('right')
        break
      case 'F':
      case 'f': {
        const hoveredCell = store.getState().gameState.hoveredCell
        if (!hoveredCell) {
          return
        }
        toggleFlag(hoveredCell.y, hoveredCell.x)
        break
      }
      case 'Enter':
      case 'X':
      case 'x': {
        const hoveredCell = store.getState().gameState.hoveredCell
        if (!hoveredCell) {
          return
        }
        revealCell(hoveredCell.y, hoveredCell.x)
        break
      }
      default:
        return
    }
  }

  handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const { row, col } = this._getCellCoordinates(event)
    const newGameState = this.gameEngine.setHoverCell(row, col)
    store.dispatch(updateHover(newGameState.hoveredCell))
  }

  restartGame(): void {
    // При рестарте создаем игру заново, сбрасываем firstMoveMade и startTime
    this.generateGame(store.getState().gameState.difficulty)
  }

  private _getCellCoordinates(event: React.MouseEvent<HTMLCanvasElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const canvasWidth = event.currentTarget.width
    const canvasHeight = event.currentTarget.height
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const rows = this.gameEngine.rows
    const cols = this.gameEngine.columns

    // Calculate the width and height of each cell
    const cellWidth = canvasWidth / cols
    const cellHeight = canvasHeight / rows

    // Calculate the column and row index from the click position
    const col = Math.floor(x / cellWidth)
    const row = Math.floor(y / cellHeight)

    return { row, col }
  }
}
