export default function UndefinedCell(
  x: number,
  y: number,
  cellSize: number,
  ctx: CanvasRenderingContext2D
) {
  // background
  ctx.fillStyle = '#BFBFBF'
  ctx.fillRect(x, y, cellSize, cellSize)

  // border
  const border = new Path2D()
  border.moveTo(x, y)
  border.lineTo(x + cellSize, y)
  border.lineTo(x + cellSize, y + cellSize)
  border.lineTo(x, y + cellSize)
  border.lineTo(x, y)
  ctx.lineWidth = 2
  ctx.strokeStyle = '#FFFFFF'
  ctx.stroke(border)
}
