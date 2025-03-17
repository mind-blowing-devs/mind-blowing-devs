import EmptyCell from './EmptyCell'

export default function Empty1Cell(
  x: number,
  y: number,
  cellSize: number,
  ctx: CanvasRenderingContext2D
) {
  EmptyCell(x, y, cellSize, ctx)

  const halfCellSize = cellSize / 2
  ctx.fillStyle = '#0B24FB'
  ctx.fillText('1', x + halfCellSize, y + halfCellSize)
}
