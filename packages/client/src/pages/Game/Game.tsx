import { useState } from 'react'
import GameHeader from '../../components/game/GameHeader'
import GameCanvas from '../../components/game/GameCanvas'
import { Link } from 'react-router-dom'

export default function Game() {
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>(
    'playing'
  )

  // TEMP: Функция для случайного изменения статуса игры
  const changeRandomStatus = () => {
    const statuses: ('playing' | 'won' | 'lost')[] = ['playing', 'won', 'lost']
    const randomIndex = Math.floor(Math.random() * statuses.length)
    const newStatus = statuses[randomIndex]
    setGameStatus(newStatus)
  }

  return (
    <main className="font-press bg-[#BFBFBF] flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center mb-4">
        <p className="w-full max-w-[250px] sm:max-w-xl mb-[42px] sm:mb-[72px] sm:text-xl text-center text-[#585656]">
          Oops! Something exploded on the server!
        </p>
      </div>

      <div className="bg-[#BFBFBF] p-2 border-4 border-t-white border-l-white border-r-[#7B7B7B] border-b-[#7B7B7B]">
        <GameHeader
          minesLeft={40}
          time={0}
          onReset={changeRandomStatus}
          gameStatus={gameStatus}
        />

        {/* TEMP: Можно изменять cellSize (размер) и width/height (количество) ячеек, поле будет перестраиваться автоматически */}
        <GameCanvas width={16} height={16} cellSize={32} />
      </div>

      <Link
        to="/"
        className="mt-8 hover:text-gray-500 text-xs sm:text-sm"
        aria-label="Back to home page">
        [return home]
      </Link>
    </main>
  )
}
