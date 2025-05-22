export default function IdleCell(
  x: number,
  y: number,
  cellSize: number,
  ctx: CanvasRenderingContext2D
) {
  // background
  ctx.fillStyle = '#BFBFBF'
  ctx.rect(x, y, cellSize, cellSize)

  // white border
  const wBorder = new Path2D()
  wBorder.moveTo(x, y)
  wBorder.lineTo(x + cellSize, y)
  wBorder.lineTo(x + cellSize - 4, y + 4)
  wBorder.lineTo(x + 4, y + 4)
  wBorder.lineTo(x + 4, y + cellSize - 4)
  wBorder.lineTo(x, y + cellSize)
  wBorder.lineTo(x, y)
  ctx.lineWidth = 2
  ctx.fillStyle = '#FFFFFF'
  ctx.fill(wBorder)

  // gray border
  const gBorder = new Path2D()
  gBorder.moveTo(x + cellSize, y)
  gBorder.lineTo(x + cellSize, y + cellSize)
  gBorder.lineTo(x, y + cellSize)
  gBorder.lineTo(x + 4, y + cellSize - 4)
  gBorder.lineTo(x + cellSize - 4, y + cellSize - 4)
  gBorder.lineTo(x + cellSize - 4, y + 4)
  gBorder.lineTo(x + cellSize, y)
  ctx.lineWidth = 2
  ctx.fillStyle = '#878787'
  ctx.fill(gBorder)
}
