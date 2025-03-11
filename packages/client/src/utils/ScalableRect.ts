export class ScalableRect {
  private x: number
  private y: number
  private scale: number
  private ctx: CanvasRenderingContext2D

  constructor(
    x: number,
    y: number,
    cellSize: number,
    ctx: CanvasRenderingContext2D
  ) {
    this.x = x
    this.y = y
    this.scale = cellSize / 32
    this.ctx = ctx
  }

  fill(color: string) {
    this.ctx.fillStyle = color
  }

  draw(offsetX: number, offsetY: number, width: number, height: number) {
    this.ctx.fillRect(
      this.x + offsetX * this.scale,
      this.y + offsetY * this.scale,
      width * this.scale,
      height * this.scale
    )
  }
}
