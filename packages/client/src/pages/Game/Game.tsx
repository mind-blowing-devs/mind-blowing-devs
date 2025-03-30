import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import {
  RootState,
  useAppSelector,
  useAppDispatch,
  toggleFullScreen,
  setIsCanvasDraggable,
} from '../../store'

import { GameHeader, ResultModal, SettingsModal, GameField } from './components'
import { GameController } from '../../controllers'
import useScreenSize from '../../hooks/useScreenSize'

type Difficulty = RootState['gameState']['difficulty']
type Theme = 'classic' | 'dark'

const gameController = new GameController()

function Game() {
  const {
    minesLeft,
    minesRevealed,
    status,
    difficulty,
    startTime,
    finishTime,
  } = useAppSelector(state => state.gameState)

  const dispatch = useAppDispatch()
  const screenSize = useScreenSize()

  useEffect(() => {
    dispatch(setIsCanvasDraggable(screenSize.width < 1280))
  }, [screenSize])

  // Состояния для модальных окон
  const [showSettings, setShowSettings] = useState(false)
  const [showResult, setShowResult] = useState(false)

  // Открытие модального окна настроек
  const handleOpenSettings = () => {
    setShowSettings(true)
  }

  const handleSaveSettings = (difficulty: Difficulty, theme: Theme) => {
    gameController.generateGame(difficulty)
    localStorage.setItem('theme', theme)
  }

  // Метод для открытия полноэкранного режима
  const handleFullScreen = () => {
    dispatch(toggleFullScreen())
  }

  // Метод для закрытия модального окна результата и сброса игры
  const handleCloseResult = () => {
    setShowResult(false)
    gameController.generateGame()
  }

  // Функция для обработки клика на кнопку сброса
  const handleResetClick = () => {
    // Показываем модальное окно в соответствии с текущим статусом игры
    if (status === 'won' || status === 'lost') {
      setShowResult(true)
    } else {
      gameController.generateGame()
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen lg:p-4">
      <div className="text-center pb-4 hidden lg:block">
        <h1 className="w-full max-w-[250px] sm:max-w-xl mb-[42px] lg:mb-[72px] sm:text-xl text-center text-font-color">
          Every click counts! Can you beat the minefield?
        </h1>
      </div>

      <div className="bg-[#BFBFBF] p-2 border-4 border-t-white border-l-white border-r-[#7B7B7B] border-b-[#7B7B7B] w-full xl:w-auto h-screen lg:h-[80vh] xl:h-auto flex flex-col">
        <GameHeader
          gameStatus={status}
          minesLeft={minesLeft}
          onFullScreen={handleFullScreen}
          onOpenSettings={handleOpenSettings}
          onReset={handleResetClick}
          startTime={startTime}
        />

        <GameField
          handleCellClick={gameController.handleCellClick}
          handleContextMenu={gameController.handleContextMenu}
          handleKeyDown={gameController.handleKeyDown}
          handlePointerMove={gameController.handlePointerMove}
        />
      </div>

      <Link
        to="/"
        className="mt-8 hover:text-gray-500 text-xs sm:text-sm hidden lg:block"
        aria-label="Back to home page">
        [return home]
      </Link>

      {/* Модальное окно настроек */}
      <SettingsModal
        onClose={() => setShowSettings(false)}
        handleSave={handleSaveSettings}
        isOpen={showSettings}
      />

      {/* Модальное окно результата */}
      <ResultModal
        onClose={handleCloseResult}
        isOpen={showResult}
        cellsRevealed={minesRevealed}
        minesLeft={minesLeft}
        startTime={startTime}
        finishTime={finishTime}
        difficulty={difficulty}
        result={status === 'won' ? 'won' : 'lost'}
      />
    </main>
  )
}

export default Game
