import EmptyCell from './EmptyCell'

export default function Empty5Cell(
  x: number,
  y: number,
  cellSize: number,
  ctx: CanvasRenderingContext2D
) {
  EmptyCell(x, y, cellSize, ctx)

  const halfCellSize = cellSize / 2
  ctx.fillStyle = '#852123'
  ctx.fillText('5', x + halfCellSize, y + halfCellSize)
}
