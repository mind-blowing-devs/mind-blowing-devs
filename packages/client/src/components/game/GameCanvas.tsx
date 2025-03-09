interface IGameCanvas {
  width: number
  height: number
  cellSize: number
}

// MOCK: Компонент для создания сетки ячеек
export default function GameCanvas({ width, height, cellSize }: IGameCanvas) {
  const renderCells = () => {
    const cells = []

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        cells.push(
          <div
            key={`${x}-${y}`}
            className="bg-[#BFBFBF] border-t border-l border-white border-r border-b border-[#7B7B7B]"
            style={{
              width: cellSize,
              height: cellSize,
            }}
          />
        )
      }
    }

    return cells
  }

  return (
    <div className="border-4 border-t-[#7B7B7B] border-l-[#7B7B7B] border-r-white border-b-white bg-[#BFBFBF]">
      <div
        className="grid bg-[#BFBFBF]"
        style={{
          width: width * cellSize,
          height: height * cellSize,
          gridTemplateColumns: `repeat(${width}, ${cellSize}px)`,
          gridTemplateRows: `repeat(${height}, ${cellSize}px)`,
        }}>
        {renderCells()}
      </div>
    </div>
  )
}
