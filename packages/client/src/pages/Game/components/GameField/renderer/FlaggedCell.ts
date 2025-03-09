import IdleCell from './IdleCell'

export default function FlaggedCell(
  x: number,
  y: number,
  cellSize: number,
  ctx: CanvasRenderingContext2D
) {
  IdleCell(x, y, cellSize, ctx)

  // mine
  const flag = new Path2D()
  const topCenterX = x + cellSize / 2
  const topCenterY = y + (cellSize / 100) * 20
  flag.moveTo(topCenterX, topCenterY)
  flag.lineTo(topCenterX, y + cellSize / 2)

  const height = y + cellSize / 2 - topCenterY
  const flagLeftX = x + (cellSize / 100) * 20
  const flagCenterY = topCenterY + height / 2
  flag.lineTo(flagLeftX, flagCenterY) // sharpLeft
  flag.lineTo(topCenterX, topCenterY)

  ctx.fillStyle = '#FC0D1B'
  ctx.fill(flag)
}
