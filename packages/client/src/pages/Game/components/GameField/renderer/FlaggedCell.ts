import IdleCell from './IdleCell'
import { ScalableRect } from '../../../../../utils/ScalableRect'

export default function FlaggedCell(
  x: number,
  y: number,
  cellSize: number,
  ctx: CanvasRenderingContext2D
) {
  IdleCell(x, y, cellSize, ctx)

  const rect = new ScalableRect(x, y, cellSize, ctx)

  // Flag
  rect.fill('#FC0D1B') // red
  rect.draw(14, 7, 4, 8)
  rect.draw(12, 8, 2, 6)
  rect.draw(10, 10, 2, 2)

  // Flagpole
  rect.fill('black')
  rect.draw(15, 15, 3, 8)

  // Base
  rect.draw(8, 22, 16, 4)
  rect.draw(10, 20, 12, 3)
}
