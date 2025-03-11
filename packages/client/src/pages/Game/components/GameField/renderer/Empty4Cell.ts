import EmptyCell from './EmptyCell'

export default function Empty4Cell(
  x: number,
  y: number,
  cellSize: number,
  ctx: CanvasRenderingContext2D
) {
  EmptyCell(x, y, cellSize, ctx)

  const halfCellSize = cellSize / 2
  ctx.fillStyle = 'Black'
  ctx.fillText('4', x + halfCellSize, y + halfCellSize)
}
