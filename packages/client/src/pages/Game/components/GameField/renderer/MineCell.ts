export default function MineCell(
  x: number,
  y: number,
  cellSize: number,
  ctx: CanvasRenderingContext2D
) {
  // background
  const cell = new Path2D()
  cell.rect(x, y, cellSize, cellSize)
  ctx.fillStyle = '#FC0D1B'
  ctx.fill(cell)

  // mine
  const mine = new Path2D()
  mine.rect(x + cellSize / 4, y + cellSize / 4, cellSize / 2, cellSize / 2)
  ctx.fillStyle = '#000000'
  ctx.fill(mine)
}
