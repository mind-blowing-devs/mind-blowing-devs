export default function EmptyCell(
  x: number,
  y: number,
  cellSize: number,
  ctx: CanvasRenderingContext2D
) {
  ctx.font = `${cellSize * 0.5}px 'Press Start 2P'`
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#BFBFBF'
  ctx.fillRect(x, y, cellSize, cellSize)
}
