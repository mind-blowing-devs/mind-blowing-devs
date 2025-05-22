import EmptyCell from './EmptyCell'

export default function Empty3Cell(
  x: number,
  y: number,
  cellSize: number,
  ctx: CanvasRenderingContext2D
) {
  EmptyCell(x, y, cellSize, ctx)

  const halfCellSize = cellSize / 2
  ctx.fillStyle = '#FC0D1B'
  ctx.fillText('3', x + halfCellSize, y + halfCellSize)
}
