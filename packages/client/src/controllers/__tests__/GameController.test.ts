import GameController from '../GameController'

// intermediate difficulty creates field 25*25
const difficulty = 'intermediate'
const fieldRows = 25
const fieldColumns = 25
const cellSize = 32

// Mock Redux store
jest.mock('../../store/store', () => ({
  default: {
    getState: jest.fn(() => ({
      gameState: {
        difficulty: 'intermediate',
        firstMoveMade: false,
        hoveredCell: null,
      },
    })),
    dispatch: jest.fn(),
  },
}))

// Mock GameEngine
jest.mock('../../controllers/GameEngine', () => {
  const mockState = {
    field: [],
    status: 'playing',
    minesRevealed: 0,
    minesLeft: 75,
    hoveredCell: null,
  }

  return {
    default: jest.fn().mockImplementation(() => ({
      rows: fieldRows,
      columns: fieldColumns,
      getState: jest.fn(() => ({ ...mockState })),
      revealCell: jest.fn(() => ({ ...mockState })),
      toggleFlag: jest.fn(() => ({ ...mockState })),
    })),
  }
})

const createMockMouseEvent = (
  xPos: number,
  yPos: number,
  canvas: HTMLCanvasElement
): React.MouseEvent<HTMLCanvasElement> => {
  const event = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    clientX: xPos,
    clientY: yPos,
    button: 0,
  })

  Object.defineProperty(event, 'target', { value: canvas, writable: false })
  Object.defineProperty(event, 'currentTarget', {
    value: canvas,
    writable: false,
  })

  return event as unknown as React.MouseEvent<HTMLCanvasElement>
}

describe('Game Controller', () => {
  let gameController: GameController
  let canvas: HTMLCanvasElement

  beforeEach(() => {
    jest.resetModules()
    jest.restoreAllMocks()

    canvas = document.createElement('canvas')
    canvas.width = fieldRows * cellSize
    canvas.height = fieldColumns * cellSize

    gameController = new GameController()
    gameController.generateGame(difficulty)
  })

  it('should reveal cell at position 0,0', () => {
    const revealCellEngineMethod = jest.spyOn(
      gameController.gameEngine,
      'revealCell'
    )
    const mouseEvent = createMockMouseEvent(0, 0, canvas)

    gameController.handleCellClick(mouseEvent)

    expect(revealCellEngineMethod).toBeCalledWith(0, 0)
  })

  it('should reveal cell at position 1,2', () => {
    const revealCellEngineMethod = jest.spyOn(
      gameController.gameEngine,
      'revealCell'
    )
    const mouseEvent = createMockMouseEvent(65, 33, canvas)

    gameController.handleCellClick(mouseEvent)

    expect(revealCellEngineMethod).toBeCalledWith(1, 2)
  })

  it('should reveal cell at position 25,25', () => {
    const revealCellEngineMethod = jest.spyOn(
      gameController.gameEngine,
      'revealCell'
    )
    const mouseEvent = createMockMouseEvent(
      fieldColumns * cellSize,
      fieldRows * cellSize,
      canvas
    )

    gameController.handleCellClick(mouseEvent)

    expect(revealCellEngineMethod).toBeCalledWith(25, 25)
  })

  it('should put a flag at position 0,0', () => {
    const toggleFlagEngineMethod = jest.spyOn(
      gameController.gameEngine,
      'toggleFlag'
    )
    const mouseEvent = createMockMouseEvent(1, 0, canvas)

    gameController.handleRightClick(mouseEvent)

    expect(toggleFlagEngineMethod).toBeCalledWith(0, 0)
  })

  it('should put a flag at position 4,8', () => {
    const toggleFlagEngineMethod = jest.spyOn(
      gameController.gameEngine,
      'toggleFlag'
    )
    const mouseEvent = createMockMouseEvent(257, 130, canvas)

    gameController.handleRightClick(mouseEvent)

    expect(toggleFlagEngineMethod).toBeCalledWith(4, 8)
  })

  it('should put a flag at position 25,25', () => {
    const toggleFlagEngineMethod = jest.spyOn(
      gameController.gameEngine,
      'toggleFlag'
    )
    const mouseEvent = createMockMouseEvent(
      fieldColumns * cellSize,
      fieldRows * cellSize,
      canvas
    )

    gameController.handleRightClick(mouseEvent)

    expect(toggleFlagEngineMethod).toBeCalledWith(25, 25)
  })
})
