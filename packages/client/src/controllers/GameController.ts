import store, { RootState } from '../store/store'
import { createGame, updateField, updateDifficulty } from '../store/gameState'
import GameEngine from './GameEngine'
import React from 'react'

type Difficulty = RootState['gameState']['difficulty']

export default class GameController {
  gameEngine: GameEngine

  constructor() {
    this.handleCellClick = this.handleCellClick.bind(this)
    this.handleRightClick = this.handleRightClick.bind(this)
    this.gameEngine = new GameEngine(0, 0, 0)

    this.generateGame()
  }
  generateGame(difficulty?: Difficulty) {
    let rows, cols, mines

    const storeDifficulty = store.getState().gameState.difficulty
    if (difficulty !== undefined && storeDifficulty !== difficulty) {
      store.dispatch(updateDifficulty(difficulty))
    }
    switch (storeDifficulty) {
      case 'beginner':
        rows = cols = 15
        mines = 14
        break
      case 'expert':
        rows = cols = 40
        mines = 230
        break
      case 'intermediate':
      default:
        rows = cols = 25
        mines = 75
        break
    }

    this.gameEngine = new GameEngine(rows, cols, mines)
    store.dispatch(createGame(this.gameEngine.getState()))
  }

  handleCellClick(event: React.MouseEvent<HTMLCanvasElement>) {
    const { row, col } = this._getCellCoordinates(event)
    store.dispatch(updateField(this.gameEngine.revealCell(row, col)))
  }

  handleRightClick(event: React.MouseEvent<HTMLCanvasElement>) {
    event.preventDefault()
    const { row, col } = this._getCellCoordinates(event)
    store.dispatch(updateField(this.gameEngine.toggleFlag(row, col)))
  }

  restartGame(): void {
    store.dispatch(updateField(this.gameEngine.restartGame()))
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
