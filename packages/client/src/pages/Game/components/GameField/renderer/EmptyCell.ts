export default function EmptyCell(
  x: number,
  y: number,
  cellSize: number,
  ctx: CanvasRenderingContext2D
) {
  ctx.fillStyle = '#BFBFBF'
  ctx.fillRect(x, y, cellSize, cellSize)
}
