import { GameState } from '../store/gameState'
import { CellData } from '../store/gameState'
import getRandom from '../utils/getRandom'
import cloneDeep from '../utils/cloneDeep'

type GameField = GameState['field']
type GameStatus = GameState['status']
type CurrentGameState = Pick<
  GameState,
  'status' | 'field' | 'minesRevealed' | 'minesLeft' | 'hoveredCell'
>
type HoveredCell = GameState['hoveredCell']

export default class GameEngine {
  private _field: GameField = []
  private status: GameStatus = 'idle'
  minesRevealed: number
  minesLeft: number
  minesTotal: number
  rows: number
  columns: number
  hoveredCell: HoveredCell

  constructor(rows: number, cols: number, mines: number) {
    const field: GameField = []

    // creating an empty field
    for (let row = 0; row < rows; row++) {
      const cellsColumn: CellData[] = []
      for (let col = 0; col < cols; col++) {
        cellsColumn.push({
          isRevealed: false,
          isMine: false,
          isFlagged: false,
          surroundingMines: 0,
        })
      }
      field.push(cellsColumn)
    }

    // filling it with mines
    for (let mine = 0; mine < mines; mine++) {
      let randomRow
      let randomCol
      let targetIsMine

      do {
        randomRow = getRandom(0, rows - 1)
        randomCol = getRandom(0, cols - 1)
        targetIsMine = field[randomRow][randomCol].isMine
      } while (targetIsMine)

      // Now we found a valid location
      field[randomRow][randomCol].isMine = true
    }

    // setting surrounding miles count
    function hasMine(cells: CellData): boolean {
      return cells.isMine
    }

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // scanning around cells and count mines
        let surroundingMines = 0

        for (const [dr, dc] of [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, -1],
          [0, 1],
          [1, -1],
          [1, 0],
          [1, 1],
        ]) {
          if (
            row + dr < 0 ||
            row + dr >= rows ||
            col + dc < 0 ||
            col + dc >= cols
          ) {
            continue
          }
          if (hasMine(field[row + dr][col + dc])) {
            surroundingMines++
          }
        }

        field[row][col].surroundingMines = surroundingMines
      }
    }

    this.rows = rows
    this.columns = cols
    this.minesTotal = mines
    this.field = field
    this.minesRevealed = 0
    this.minesLeft = mines
    this.status = 'playing'
    this.hoveredCell = null
  }

  get field() {
    return this._field
  }

  set field(field: GameField) {
    this._field = field
    this._updateMinesCount()
    this._updateGameStatus()
  }

  revealCell(row: number, col: number): CurrentGameState {
    const { isRevealed, isFlagged } = this.field[row][col]
    const interactionForbidden = this.isGameFrozen || isRevealed || isFlagged
    if (interactionForbidden) return this.getState()

    const fieldClone = cloneDeep(this.field)

    const revealAdjacentCells = (r: number, c: number) => {
      if (r < 0 || r >= this.rows || c < 0 || c >= this.columns) return // Out of bounds
      const cell = fieldClone[r][c]
      if (cell.isRevealed || cell.isFlagged) return // Already revealed or flagged

      cell.isRevealed = true

      if (fieldClone[row][col].isMine) {
        this.status = 'lost'
        this.hoveredCell = null
      }

      // If there are no surrounding mines, continue revealing adjacent cells
      if (cell.surroundingMines === 0) {
        for (const [dr, dc] of [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, -1],
          [0, 1],
          [1, -1],
          [1, 0],
          [1, 1],
        ]) {
          revealAdjacentCells(r + dr, c + dc)
        }
      }
    }

    // Start revealing from the clicked cell
    revealAdjacentCells(row, col)

    this.field = fieldClone
    return this.getState()
  }

  toggleFlag(row: number, col: number): CurrentGameState {
    const interactionForbidden =
      this.isGameFrozen || this.field[row][col].isRevealed
    if (interactionForbidden) return this.getState()

    const fieldClone = cloneDeep(this.field)
    fieldClone[row][col].isFlagged = !fieldClone[row][col].isFlagged
    this.field = fieldClone
    return this.getState()
  }

  setHoverCell(row: number, col: number): CurrentGameState {
    if (this.isGameFrozen) return this.getState()

    const isBeyondField =
      col < 0 || col > this.rows - 1 || row < 0 || row > this.columns - 1
    if (isBeyondField) {
      // leave the state unchanged since the cell is out of reach
      return this.getState()
    }

    this.hoveredCell = {
      x: col,
      y: row,
    }
    return this.getState()
  }

  shiftHoverCell(
    direction: 'down' | 'up' | 'right' | 'left'
  ): CurrentGameState {
    if (this.isGameFrozen) return this.getState()
    // getting the current hover state
    let { x, y } = this.hoveredCell ?? { x: 0, y: 0 }

    const shifts = [
      [0, 1],
      [0, -1],
      [-1, 0],
      [1, 0],
    ]
    let shiftCase = -1
    switch (direction) {
      case 'down':
        shiftCase = 0
        break
      case 'up':
        shiftCase = 1
        break
      case 'left':
        shiftCase = 2
        break
      case 'right':
        shiftCase = 3
        break
      default:
        return this.getState()
    }

    // apply shifts
    x += shifts[shiftCase][0]
    y += shifts[shiftCase][1]

    return this.setHoverCell(y, x)
  }

  isGameOver(): boolean {
    return this.status === 'lost'
  }

  getState(): CurrentGameState {
    return {
      field: this.field,
      status: this.status,
      minesRevealed: this.minesRevealed,
      minesLeft: this.minesLeft,
      hoveredCell: this.hoveredCell,
    }
  }

  restartGame(): CurrentGameState {
    const fieldClone = cloneDeep(this.field)

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.columns; col++) {
        // revert all the mines to initial state
        fieldClone[row][col].isFlagged = false
        fieldClone[row][col].isRevealed = false
      }
    }
    this.field = fieldClone
    this.hoveredCell = null

    return this.getState()
  }

  private _updateMinesCount() {
    let revealed = 0

    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.columns; col++) {
        const item = this.field[row][col]

        if (item.isFlagged) revealed++
      }
    }

    this.minesRevealed = revealed

    this.minesLeft = this.minesTotal - revealed
  }

  private _updateGameStatus() {
    for (let row = 0; row < this.rows; row++) {
      const mineExposed =
        this.field[row].find(i => i.isMine && i.isRevealed) !== undefined
      if (mineExposed) {
        this.status = 'lost'
        this.hoveredCell = null
        return
      }
    }

    for (let row = 0; row < this.rows; row++) {
      const allRevealed =
        this.field[row].find(i => !i.isMine && !i.isRevealed) === undefined
      if (!allRevealed) return
    }
    // all mines have been revealed
    this.status = 'won'
    this.hoveredCell = null
  }

  private get isGameFrozen(): boolean {
    return this.status === 'lost' || this.status === 'idle'
  }
}
