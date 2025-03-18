import Counter from './Counter'
import GameButton from './GameButton'
import { useEffect, useState, FC } from 'react'

interface IGameHeader {
  minesLeft: number
  startTime: number
  onReset: () => void
  onOpenSettings: () => void
  onFullScreen: () => void
  gameStatus: 'playing' | 'won' | 'lost' | 'idle'
}

const GameHeader: FC<IGameHeader> = ({
  minesLeft,
  startTime,
  onReset,
  gameStatus,
  onOpenSettings,
  onFullScreen,
}: IGameHeader) => {
  const calculateElapsedTime = () =>
    startTime > 0 ? Math.floor((Date.now() - startTime) / 1000) : 0

  const [gameTimer, setGameTimer] = useState(calculateElapsedTime())

  useEffect(() => {
    let id: number | undefined

    // Запускаем таймер только если игра активна и startTime > 0
    if (gameStatus === 'playing' && startTime > 0) {
      id = setInterval(() => {
        setGameTimer(calculateElapsedTime())
      }, 1000) as unknown as number
    } else {
      // Для других статусов устанавливаем таймер === 0 или текущее значение
      setGameTimer(startTime > 0 ? calculateElapsedTime() : 0)
    }

    return () => {
      if (id) {
        clearInterval(id)
      }
    }
  }, [gameStatus, startTime])

  return (
    <div className="flex justify-between items-center px-4 py-2 border-4 border-t-[#7B7B7B] border-l-[#7B7B7B] border-r-white border-b-white bg-[#BFBFBF] mb-2">
      <Counter value={minesLeft} />
      <div className="flex items-center gap-8">
        <GameButton variant="fullscreen" onClick={onFullScreen} />
        <GameButton variant="reset" onClick={onReset} gameStatus={gameStatus} />
        <GameButton variant="settings" onClick={onOpenSettings} />
      </div>
      <Counter value={gameTimer} />
    </div>
  )
}

export default GameHeader
