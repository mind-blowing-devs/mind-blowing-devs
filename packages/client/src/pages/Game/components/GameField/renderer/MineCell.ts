import { ScalableRect } from '../../../../../utils/ScalableRect'

export default function MineCell(
  x: number,
  y: number,
  cellSize: number,
  ctx: CanvasRenderingContext2D
) {
  const rect = new ScalableRect(x, y, cellSize, ctx)
  // Background
  rect.fill('#FC0D1B') // red
  rect.draw(0, 0, cellSize, cellSize, 1)

  // Mine
  rect.fill('black')
  rect.draw(15, 5, 2, 22)
  rect.draw(5, 15, 22, 2)

  rect.draw(11, 8, 10, 16)
  rect.draw(8, 11, 16, 10)

  // Mine fragments
  // Top
  rect.draw(7, 7, 2, 2)
  rect.draw(23, 7, 2, 2)

  // Bottom
  rect.draw(7, 23, 2, 2)
  rect.draw(23, 23, 2, 2)

  // Mine glare
  rect.fill('white')
  rect.draw(12, 12, 3, 3)
}
