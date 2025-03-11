import EmptyCell from './EmptyCell'
import MineCell from './MineCell'
import UndefinedCell from './UndefinedCell'
import IdleCell from './IdleCell'
import Empty1Cell from './Empty1Cell'
import Empty2Cell from './Empty2Cell'
import Empty3Cell from './Empty3Cell'
import Empty4Cell from './Empty4Cell'
import Empty5Cell from './Empty5Cell'
import Empty6Cell from './Empty6Cell'
import Empty7Cell from './Empty7Cell'
import Empty8Cell from './Empty8Cell'
import FlaggedCell from './FlaggedCell'

export default function initializeRenderer(
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  cellSize: number
) {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight)

  function clearCell(x: number, y: number) {
    ctx.clearRect(x, y, cellSize, cellSize)
  }

  return function renderCell(object: string, x: number, y: number) {
    clearCell(x, y)
    switch (object) {
      case 'UndefinedCell':
        // used when game wasn't initialized
        UndefinedCell(x, y, cellSize, ctx)
        break
      case 'IdleCell':
        IdleCell(x, y, cellSize, ctx)
        break
      case 'MineCell':
        MineCell(x, y, cellSize, ctx)
        break
      case 'FlaggedCell':
        FlaggedCell(x, y, cellSize, ctx)
        break
      case 'EmptyCell':
        EmptyCell(x, y, cellSize, ctx)
        break
      case 'Empty1Cell':
        Empty1Cell(x, y, cellSize, ctx)
        break
      case 'Empty2Cell':
        Empty2Cell(x, y, cellSize, ctx)
        break
      case 'Empty3Cell':
        Empty3Cell(x, y, cellSize, ctx)
        break
      case 'Empty4Cell':
        Empty4Cell(x, y, cellSize, ctx)
        break
      case 'Empty5Cell':
        Empty5Cell(x, y, cellSize, ctx)
        break
      case 'Empty6Cell':
        Empty6Cell(x, y, cellSize, ctx)
        break
      case 'Empty7Cell':
        Empty7Cell(x, y, cellSize, ctx)
        break
      case 'Empty8Cell':
        Empty8Cell(x, y, cellSize, ctx)
        break
      default:
      // throw new Error('Render object not implemented');
    }
  }
}
