import GameEngine from '../GameEngine'
import getRandom from '../../utils/getRandom'
import cloneDeep from '../../utils/cloneDeep'
import isEqual from '../../utils/isEqual'

describe('Game Engine', () => {
  let gameEngine: GameEngine

  beforeEach(() => {
    gameEngine = new GameEngine(
      getRandom(20, 50),
      getRandom(20, 50),
      getRandom(20, 50)
    )
  })

  it('should have playing status after initialized', () => {
    const status = gameEngine.getState().status

    expect(status).toBe('playing')
  })

  it('should reveal a cell', () => {
    const field = gameEngine.getState().field
    let emptyCellPosX = 0
    let emptyCellPosY = 0
    for (const [index, row] of Object.entries(field)) {
      // searching for a non-mine cell position
      emptyCellPosY = Number(index)
      const found = row.find((cell, indexX) => {
        emptyCellPosX = indexX
        return !cell.isMine
      })

      if (found) break
    }

    gameEngine.revealCell(emptyCellPosY, emptyCellPosX)

    const cell = gameEngine.getState().field[emptyCellPosY][emptyCellPosX]
    expect(cell.isRevealed).toBeTruthy()
  })

  it('should flag a cell', () => {
    const field = gameEngine.getState().field
    let emptyCellPosX = 0
    let emptyCellPosY = 0
    for (const [index, row] of Object.entries(field)) {
      // searching for a non-mine cell position
      emptyCellPosY = Number(index)
      const found = row.find((cell, indexX) => {
        emptyCellPosX = indexX
        return !cell.isMine
      })

      if (found) break
    }

    gameEngine.toggleFlag(emptyCellPosY, emptyCellPosX)

    const cell = gameEngine.getState().field[emptyCellPosY][emptyCellPosX]
    expect(cell.isFlagged).toBeTruthy()
  })

  it('should unflag a flagged cell', () => {
    const field = gameEngine.getState().field
    let emptyCellPosX = 0
    let emptyCellPosY = 0
    for (const [index, row] of Object.entries(field)) {
      // searching for a non-mine cell position
      emptyCellPosY = Number(index)
      const found = row.find((cell, indexX) => {
        emptyCellPosX = indexX
        return !cell.isMine
      })

      if (found) break
    }
    gameEngine.toggleFlag(emptyCellPosY, emptyCellPosX)

    gameEngine.toggleFlag(emptyCellPosY, emptyCellPosX)

    const cell = gameEngine.getState().field[emptyCellPosY][emptyCellPosX]
    expect(cell.isFlagged).toBeFalsy()
  })

  it('should not reveal the cell after it has been flagged', () => {
    const x = getRandom(0, gameEngine.columns - 1)
    const y = getRandom(0, gameEngine.rows - 1)
    gameEngine.toggleFlag(y, x)

    gameEngine.revealCell(y, x)

    const cell = gameEngine.getState().field[y][x]
    expect(cell.isRevealed).toBeFalsy()
  })

  it('should have playing status after non-mine cell revealed', () => {
    const field = gameEngine.getState().field
    let emptyCellPosX = 0
    let emptyCellPosY = 0
    for (const [index, row] of Object.entries(field)) {
      // searching for a non-mine cell position
      emptyCellPosY = Number(index)
      const found = row.find((cell, indexX) => {
        emptyCellPosX = indexX
        return !cell.isMine
      })

      if (found) break
    }

    gameEngine.revealCell(emptyCellPosY, emptyCellPosX)

    expect(gameEngine.getState().status).toBe('playing')
    expect(gameEngine.isGameOver()).toBeFalsy()
  })

  it('should change status to lost after hit a mine', () => {
    const field = gameEngine.getState().field
    let minePosX = 0
    let minePosY = 0
    for (const [index, row] of Object.entries(field)) {
      // searching for a mine cell position
      minePosY = Number(index)
      const found = row.find((cell, indexX) => {
        minePosX = indexX
        return cell.isMine
      })

      if (found) break
    }

    gameEngine.revealCell(minePosY, minePosX)

    expect(gameEngine.getState().status).toBe('lost')
    expect(gameEngine.isGameOver()).toBeTruthy()
  })

  it('should not allow any interactions after the game was lost', () => {
    const field = gameEngine.getState().field
    let minePosX = 0
    let minePosY = 0
    for (const [index, row] of Object.entries(field)) {
      // searching for a mine cell position
      minePosY = Number(index)
      const found = row.find((cell, indexX) => {
        minePosX = indexX
        return cell.isMine
      })

      if (found) break
    }
    // reveal the cell with mine
    gameEngine.revealCell(minePosY, minePosX)
    const fieldBeforeInteractions = cloneDeep(gameEngine.getState().field)

    // make some interactions
    const maxRowsIndex = gameEngine.rows - 1
    const maxColsIndex = gameEngine.columns - 1
    gameEngine.toggleFlag(
      getRandom(0, maxRowsIndex),
      getRandom(0, maxColsIndex)
    )
    gameEngine.toggleFlag(
      getRandom(0, maxRowsIndex),
      getRandom(0, maxColsIndex)
    )
    gameEngine.revealCell(
      getRandom(0, maxRowsIndex),
      getRandom(0, maxColsIndex)
    )
    gameEngine.revealCell(
      getRandom(0, maxRowsIndex),
      getRandom(0, maxColsIndex)
    )

    expect(
      isEqual(fieldBeforeInteractions, gameEngine.getState().field)
    ).toBeTruthy()
  })

  it('should not have any mines', () => {
    gameEngine = new GameEngine(getRandom(20, 50), getRandom(20, 50), 0)
    const mines = gameEngine.getState().field.reduce((minesFound, row) => {
      return (
        minesFound +
        row.reduce((rowMinesFound, cell) => {
          if (cell.isMine) {
            return rowMinesFound + 1
          }
          return rowMinesFound
        }, 0)
      )
    }, 0)

    expect(mines).toBe(0)
  })

  it('should change status to won since all the cells revealed and mines flagged', () => {
    const field = gameEngine.getState().field

    // winning the game
    for (const [y, row] of Object.entries(field)) {
      for (const [x, cell] of Object.entries(row)) {
        if (cell.isMine) {
          gameEngine.toggleFlag(Number(y), Number(x))
        } else {
          gameEngine.revealCell(Number(y), Number(x))
        }
      }
    }

    const status = gameEngine.getState().status
    expect(status).toBe('won')
    expect(gameEngine.isGameOver()).toBeFalsy()
  })
})
