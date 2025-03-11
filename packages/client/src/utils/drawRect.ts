export function drawRect(
  this: CanvasRenderingContext2D,
  offsetX: number,
  offsetY: number,
  width: number,
  height: number,
  cellSize: number,
  color: string
) {
  // Classic Minesweeper grid is based on 32x32 pixel cells.
  // Keeps proportions correct.
  const pixel = cellSize / 32

  this.fillStyle = color
  this.fillRect(offsetX * pixel, offsetY * pixel, width * pixel, height * pixel)
}
