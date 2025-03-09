import EmptyCell from './EmptyCell'

export default function Empty8Cell(
  x: number,
  y: number,
  cellSize: number,
  ctx: CanvasRenderingContext2D
) {
  EmptyCell(x, y, cellSize, ctx)

  const halfCellSize = cellSize / 2
  ctx.fillStyle = 'Black'
  ctx.fillText('8', x + halfCellSize, y + halfCellSize)
}
