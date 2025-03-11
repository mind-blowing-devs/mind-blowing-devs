export default function MineCell(
  x: number,
  y: number,
  cellSize: number,
  ctx: CanvasRenderingContext2D
) {
  // Background
  ctx.drawRect(x, y, cellSize, cellSize, cellSize, '#FC0D1B')

  // Mine
  ctx.drawRect(x + 15, y + 5, 2, 22, cellSize, 'black')
  ctx.drawRect(x + 5, y + 15, 22, 2, cellSize, 'black')

  ctx.drawRect(x + 11, y + 8, 10, 16, cellSize, 'black')
  ctx.drawRect(x + 8, y + 11, 16, 10, cellSize, 'black')

  // Mine fragments
  // Top
  ctx.drawRect(x + 7, y + 7, 2, 2, cellSize, 'black')
  ctx.drawRect(x + 23, y + 7, 2, 2, cellSize, 'black')

  // Bottom
  ctx.drawRect(x + 7, y + 23, 2, 2, cellSize, 'black')
  ctx.drawRect(x + 23, y + 23, 2, 2, cellSize, 'black')

  // Mine glare
  ctx.drawRect(x + 12, y + 12, 3, 3, cellSize, 'white')
}
