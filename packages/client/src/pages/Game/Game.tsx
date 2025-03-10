import { useState } from 'react'
import { Link } from 'react-router-dom'

import GameHeader from '../../components/game/GameHeader'
import GameCanvas from '../../components/game/GameCanvas'
import ResultModal from '../../components/game/ResultModal'
import SettingsModal from '../../components/game/SettingsModal'

function Game() {
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>(
    'playing'
  )
  // Состояния для модальных окон
  const [showSettings, setShowSettings] = useState(false)
  const [showResult, setShowResult] = useState(true)

  // Открытие модального окна настроек
  const handleOpenSettings = () => {
    setShowSettings(true)
  }

  // Метод для открытия полноэкранного режима (не реализован)
  const handleFullScreen = () => {
    console.log('Полноэкранный режим')
  }

  // Метод для закрытия модального окна результата и сброса игры
  const handleCloseResult = () => {
    setShowResult(false)
    setGameStatus('playing')
  }

  // Функция для обработки клика на кнопку сброса
  const handleResetClick = () => {
    // Показываем модальное окно в соответствии с текущим статусом игры
    if (gameStatus === 'won' || gameStatus === 'lost') {
      setShowResult(true)
    } else {
      // Если игра в процессе, просто меняем статус случайным образом для демонстрации
      changeRandomStatus()
    }
  }

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
          Every click counts! Can you beat the minefield?
        </p>
      </div>

      <div className="bg-[#BFBFBF] p-2 border-4 border-t-white border-l-white border-r-[#7B7B7B] border-b-[#7B7B7B]">
        <GameHeader
          gameStatus={gameStatus}
          minesLeft={43}
          onFullScreen={handleFullScreen}
          onOpenSettings={handleOpenSettings}
          onReset={handleResetClick}
          time={58}
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

      {/* Модальное окно настроек */}
      <SettingsModal
        onClose={() => setShowSettings(false)}
        isOpen={showSettings}
      />

      {/* Модальное окно результата */}
      <ResultModal
        onClose={handleCloseResult}
        isOpen={showResult}
        result={gameStatus === 'won' ? 'won' : 'lost'}
      />
    </main>
  )
}

export default Game
