import EmptyCell from './EmptyCell'

export default function Empty6Cell(
  x: number,
  y: number,
  cellSize: number,
  ctx: CanvasRenderingContext2D
) {
  EmptyCell(x, y, cellSize, ctx)

  const halfCellSize = cellSize / 2
  ctx.fillStyle = '#278786'
  ctx.fillText('6', x + halfCellSize, y + halfCellSize)
}
