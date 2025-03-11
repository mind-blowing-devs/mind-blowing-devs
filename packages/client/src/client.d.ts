declare const __SERVER_PORT__: number

declare global {
  interface CanvasRenderingContext2D {
    drawRect: (
      offsetX: number,
      offsetY: number,
      width: number,
      height: number,
      cellSize: number,
      color: string
    ) => void
  }
}

export {}
