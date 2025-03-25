import React, { useEffect, useRef, FC } from 'react'
import renderer from './renderer'
import { useAppSelector } from '../../../../store'
import { CellData } from '../../../../store/gameState'

interface IGameCanvas {
  // TODO canvas mobile optimization
  // cellSize should be calculated in Game.tsx for better optimization in mobile devices
  cellSize: number
  handleClick: (event: React.MouseEvent<HTMLCanvasElement>) => void
  handleDoubleClick: (event: React.MouseEvent<HTMLCanvasElement>) => void
  handleKeyDown: (event: React.KeyboardEvent<HTMLCanvasElement>) => void
  handleMouseMove: (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => void
}

function getRenderObjectTypeByCell(cell: CellData): string {
  if (!cell.isRevealed) {
    if (cell.isFlagged) return 'FlaggedCell'
    return 'IdleCell'
  }
  if (cell.isMine) return 'MineCell'

  if (cell.surroundingMines === 0) {
    return 'EmptyCell'
  }

  return `Empty${cell.surroundingMines}Cell`
}

const GameField: FC<IGameCanvas> = ({
  cellSize,
  handleClick,
  handleDoubleClick,
  handleKeyDown,
  handleMouseMove,
}) => {
  const { field, status, hoveredCell } = useAppSelector(
    state => state.gameState
  )
  const width = field[0]?.length ?? 0
  const height = field.length
  const canvasWidth = width * cellSize
  const canvasHeight = height * cellSize

  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Could be optimized by re-rendering only changed cells instead of full canvas re-rendering
    function renderField() {
      for (let h = 0; h < height; h++) {
        for (let w = 0; w < width; w++) {
          render(
            status === 'idle'
              ? 'UndefinedCell'
              : getRenderObjectTypeByCell(field[h][w]),
            w * cellSize,
            h * cellSize
          )
        }
      }

      // render hover effect
      if (hoveredCell) {
        render(
          'HoverEffect',
          hoveredCell.x * cellSize,
          hoveredCell.y * cellSize,
          false
        )
      }
    }
    if (!canvasRef) {
      throw new Error('Failed to access the Canvas HTML node')
    }
    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) {
      throw new Error('Failed to access the Canvas 2D context')
    }

    const render = renderer(ctx, canvasWidth, canvasHeight, cellSize)
    renderField()
    canvasRef.current?.focus()

    return () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    }
  }, [width, height, cellSize, field, status, hoveredCell])

  return (
    <div className="border-4 border-t-[#7B7B7B] border-l-[#7B7B7B] border-r-white border-b-white bg-[#BFBFBF] cursor-pointer">
      <canvas
        className="bg-[#BFBFBF] outline-none"
        width={canvasWidth}
        height={canvasHeight}
        onClick={handleClick}
        onContextMenu={handleDoubleClick}
        onKeyDown={handleKeyDown}
        onMouseMove={handleMouseMove}
        tabIndex={0}
        ref={canvasRef}></canvas>
    </div>
  )
}

export default GameField
