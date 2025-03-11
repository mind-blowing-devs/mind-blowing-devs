import IdleCell from './IdleCell'

export default function FlaggedCell(
  x: number,
  y: number,
  cellSize: number,
  ctx: CanvasRenderingContext2D
) {
  IdleCell(x, y, cellSize, ctx)

  // Flag
  ctx.drawRect(x + 14, y + 7, 4, 8, cellSize, '#FC0D1B')
  ctx.drawRect(x + 12, y + 8, 2, 6, cellSize, '#FC0D1B')
  ctx.drawRect(x + 10, y + 10, 2, 2, cellSize, '#FC0D1B')

  // Flagpole
  ctx.drawRect(x + 15, y + 15, 3, 8, cellSize, 'black')

  // Base
  ctx.drawRect(x + 8, y + 22, 16, 4, cellSize, 'black')
  ctx.drawRect(x + 10, y + 20, 12, 3, cellSize, 'black')
}
