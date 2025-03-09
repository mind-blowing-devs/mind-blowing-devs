import Counter from './Counter'
import GameButton from './GameButton'
import { useEffect, useState } from 'react'

interface IGameHeader {
  minesLeft: number
  startTime: number
  onReset: () => void
  onOpenSettings: () => void
  onFullScreen: () => void
  gameStatus: 'playing' | 'won' | 'lost' | 'idle'
}

export default function GameHeader({
  minesLeft,
  startTime,
  onReset,
  gameStatus,
  onOpenSettings,
  onFullScreen,
}: IGameHeader) {
  const calculateElapsedTime = () => Math.floor((Date.now() - startTime) / 1000)

  const [gameTimer, setGameTimer] = useState(calculateElapsedTime())

  useEffect(() => {
    let id: number | undefined
    if (gameStatus === 'playing') {
      id = setInterval(() => {
        setGameTimer(calculateElapsedTime())
      }, 1000) as unknown as number
    }

    return () => {
      if (id) {
        clearInterval(id)
      }
    }
  }, [gameStatus])

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
