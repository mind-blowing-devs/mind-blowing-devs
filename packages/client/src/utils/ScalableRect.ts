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

  draw(
    offsetX: number,
    offsetY: number,
    width: number,
    height: number,
    customScale?: number
  ) {
    this.ctx.fillRect(
      this.x + offsetX * (customScale || this.scale),
      this.y + offsetY * (customScale || this.scale),
      width * (customScale || this.scale),
      height * (customScale || this.scale)
    )
  }
}
