import React, { useEffect, useRef, useMemo, useState, FC } from 'react'
import renderer from './renderer'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/store'
import { CellData } from '../../../../store/gameState'
import useResizeObserver from '../../../../hooks/useResizeObserver'
import { useGesture } from '@use-gesture/react'
import { useAppDispatch } from '../../../../store/store'
import { setScale as setScaleInStore } from '../../../../store/gameState'
import { setTranslatePos as setTranslatePosInStore } from '../../../../store/gameState'
import { CanvasExtendedPointerEvent } from '../../../../controllers/GameController'

interface IGameCanvas {
  // TODO canvas mobile optimization
  // cellSize should be calculated in Game.tsx for better optimization in mobile devices
  handleCellClick: (event: CanvasExtendedPointerEvent) => void
  handleContextMenu: (event: CanvasExtendedPointerEvent) => void
  handleKeyDown: (event: React.KeyboardEvent<HTMLCanvasElement>) => void
  handlePointerMove: (event: CanvasExtendedPointerEvent) => void
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
  handleCellClick,
  handleContextMenu,
  handleKeyDown,
  handlePointerMove,
}) => {
  const {
    field,
    status,
    hoveredCell,
    scale: scaleInitial,
    translatePos: translatePosInitial,
    isCanvasDraggable,
    cellSize,
  } = useSelector((state: RootState) => state.gameState)
  const dispatch = useAppDispatch()

  const [scale, setScale] = useState(scaleInitial)
  const scaleRef = useRef(scale)
  const [translatePos, setTranslatePos] = useState(translatePosInitial)
  const translatePosRef = useRef(translatePos)
  const mineFieldHorzCellsAmount = field[0]?.length ?? 0
  const mineFieldVertCellsAmount = field.length
  const mineFieldWidth = mineFieldHorzCellsAmount * cellSize
  const mineFieldHeight = mineFieldVertCellsAmount * cellSize

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasRefWrapper = useRef<HTMLDivElement>(null)
  const elSize = useResizeObserver(canvasRefWrapper)

  const canvasWidth = useMemo(() => {
    if (!isCanvasDraggable) return mineFieldWidth
    return elSize.width
  }, [isCanvasDraggable, elSize, mineFieldHorzCellsAmount])
  const canvasHeight = useMemo(() => {
    if (!isCanvasDraggable) return mineFieldHeight
    return elSize.height
  }, [isCanvasDraggable, elSize, mineFieldHorzCellsAmount])

  // Зажата ли кнопка мыши. Используется как индиктор возможности перетаскивания содержимого канваса
  const isPointerDownRef = useRef(false)
  // Метка времени при нажатии на канвас. Используется для отслеживания длительности нажатия для имитации contextmenu
  const pointerDownTimeStampRef = useRef(0)
  // Начальные координаты при перетаскивании канваса.
  const startDragOffset = useRef({ x: 0, y: 0 })
  // Флаг. Перемещается ли поле. Используется для отмены ховера при перемещении канваса и отмены фильтрации клика при снятии pointer после перемещения
  const isFieldDragging = useRef(false)
  // Флаг. Перемещается ли поле. Используется для отмены ховера при перемещении канваса и отмены фильтрации клика при снятии pointer после перемещения
  const isFieldResizingRef = useRef(false)
  // Метка времени при отпускании pointer. Используется для фильтрации обработчика клика при завершении мастабирования (pinch)
  const pointerUpTimeRef = useRef(0)

  useEffect(() => {
    scaleRef.current = scale
    translatePosRef.current = translatePos
    // Could be optimized by re-rendering only changed cells instead of full canvas re-rendering
    function renderField() {
      for (let h = 0; h < mineFieldVertCellsAmount; h++) {
        for (let w = 0; w < mineFieldHorzCellsAmount; w++) {
          renderCell(
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
        renderCell(
          'HoverEffect',
          hoveredCell.x * cellSize,
          hoveredCell.y * cellSize,
          false
        )
      }

      if (isCanvasDraggable) {
        renderFieldBorder(
          mineFieldHorzCellsAmount,
          mineFieldVertCellsAmount,
          cellSize
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
    ctx.save()
    if (!isCanvasDraggable) {
      ctx.scale(1, 1)
      ctx.translate(0, 0)
    } else {
      ctx.scale(scale, scale)
      ctx.translate(translatePos.x, translatePos.y)
    }

    const { renderCell, renderFieldBorder } = renderer(
      ctx,
      mineFieldWidth,
      mineFieldHeight,
      cellSize
    )
    renderField()
    canvasRef.current?.focus()
    ctx.restore()

    return () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    }
  }, [
    mineFieldHorzCellsAmount,
    mineFieldVertCellsAmount,
    cellSize,
    field,
    status,
    hoveredCell,
    scale,
    translatePos,
    isCanvasDraggable,
    elSize,
  ])

  // Запись в стор координат смещения и масштаба канваса на unmount чтобы не грузить стор частыми обновлениями
  useEffect(() => {
    return () => {
      dispatch(setTranslatePosInStore(translatePosRef.current))
      dispatch(setScaleInStore(scaleRef.current))
    }
  }, [])

  const bind = useGesture(
    {
      onPinch: state => {
        isFieldResizingRef.current = true
        if (state.direction[0] > 0) {
          handleZoom('in')
        } else {
          handleZoom('out')
        }
      },
      onPinchEnd: () => {
        isFieldResizingRef.current = false
      },
    },
    {}
  )

  function handlePointerDown(event: React.PointerEvent<HTMLCanvasElement>) {
    if (!isCanvasDraggable) return
    isPointerDownRef.current = true
    pointerDownTimeStampRef.current = Date.now()
    startDragOffset.current = {
      x: event.clientX - translatePos.x,
      y: event.clientY - translatePos.y,
    }
  }

  function handlePointerMoveInner(event: CanvasExtendedPointerEvent) {
    if (isFieldResizingRef.current) return

    if (isPointerDownRef.current) {
      isFieldDragging.current = true
      setTranslatePos({
        x: event.clientX - startDragOffset.current.x,
        y: event.clientY - startDragOffset.current.y,
      })
    } else if (
      !isFieldDragging.current &&
      Date.now() - pointerUpTimeRef.current > 100
    ) {
      event.scale = scale
      event.translatePos = translatePos
      handlePointerMove(event)
    }
  }

  function resetDraggingOptions() {
    isFieldDragging.current = false
    isPointerDownRef.current = false
    pointerDownTimeStampRef.current = 0
    isFieldResizingRef.current = false
  }

  function handlePointerUp(event: CanvasExtendedPointerEvent) {
    if (
      !isFieldResizingRef.current &&
      !isFieldDragging.current &&
      Date.now() - pointerUpTimeRef.current > 100
    ) {
      event.scale = scale
      event.translatePos = translatePos
      if (event.pointerType === 'mouse') {
        if (event.button === 0) handleCellClick(event)
        if (event.button === 2) {
          handleContextMenu(event)
        }
      }
      if (event.pointerType === 'touch') {
        if (
          pointerDownTimeStampRef.current !== 0 &&
          Date.now() - pointerDownTimeStampRef.current > 250
        ) {
          handleContextMenu(event)
        } else {
          handleCellClick(event)
        }
      }
    }

    pointerUpTimeRef.current = Date.now()
    resetDraggingOptions()
  }

  function handleZoom(direction: 'in' | 'out') {
    if (direction === 'in' && scale <= 1.4) {
      setScale(scale + 0.01)
    } else if (direction === 'out' && scale >= 0.5) {
      setScale(scale - 0.01)
    }
  }

  return (
    <>
      <div
        ref={canvasRefWrapper}
        className="border-4 border-t-[#7B7B7B] border-l-[#7B7B7B] border-r-white border-b-white bg-[#BFBFBF] cursor-pointer flex-grow relative">
        <div {...bind()}>
          <canvas
            className="bg-[#ccc] outline-none touch-none w-full object-contain absolute inset-0 xl:static"
            width={canvasWidth}
            height={canvasHeight}
            onContextMenu={event => event.preventDefault()}
            onKeyDown={handleKeyDown}
            onPointerMove={handlePointerMoveInner}
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerOut={resetDraggingOptions}
            onPointerOver={resetDraggingOptions}
            tabIndex={0}
            ref={canvasRef}></canvas>
        </div>
      </div>
    </>
  )
}

export default GameField
