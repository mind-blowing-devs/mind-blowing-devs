export default function HoverEffect(
  x: number,
  y: number,
  cellSize: number,
  ctx: CanvasRenderingContext2D
) {
  // background
  const bkg = new Path2D()
  bkg.rect(x, y, cellSize, cellSize)
  ctx.fillStyle = 'rgba(223, 193, 0, 20%)'
  ctx.fill(bkg)

  // border
  const border = new Path2D()
  border.moveTo(x, y)
  border.lineTo(x + cellSize, y)
  border.lineTo(x + cellSize, y + cellSize)
  border.lineTo(x, y + cellSize)
  border.lineTo(x, y)
  ctx.lineWidth = 2
  ctx.strokeStyle = 'rgba(223, 193, 0, 70%)'
  ctx.stroke(border)
}
