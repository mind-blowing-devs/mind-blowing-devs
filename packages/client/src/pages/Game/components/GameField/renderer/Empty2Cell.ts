import EmptyCell from './EmptyCell'

export default function Empty2Cell(
  x: number,
  y: number,
  cellSize: number,
  ctx: CanvasRenderingContext2D
) {
  EmptyCell(x, y, cellSize, ctx)

  const halfCellSize = cellSize / 2
  ctx.fillStyle = '#0E7A11'
  ctx.fillText('2', x + halfCellSize, y + halfCellSize)
}
