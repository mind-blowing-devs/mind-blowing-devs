import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  RootState,
  useAppSelector,
  useAppDispatch,
  toggleFullScreen,
  updateAchievements,
  increasePlayedGamesCount,
} from '../../store'

import { GameHeader, ResultModal, SettingsModal, GameField } from './components'
import { GameController } from '../../controllers'
import { type GameData, getRatingFieldName, leaderboardAPI } from '../../api'

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

  const { user, achievements } = useAppSelector(state => state.user)

  const dispatch = useAppDispatch()

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

  const sendResultToLeaderboard = async (
    data: GameData,
    ratingFieldName: string
  ) => {
    const currentResult = Number(data[ratingFieldName])
    const previousResult = achievements.gameData[ratingFieldName]

    const isNewRecord = !previousResult || currentResult > previousResult

    if (!isNewRecord) {
      return
    }

    try {
      await leaderboardAPI.addUserToLeaderboard(data, ratingFieldName)
      dispatch(updateAchievements({ ratingFieldName, currentResult }))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (status === 'won' && user?.login) {
      const ratingFieldName = getRatingFieldName(difficulty)

      // Use a negative value because the API treats higher values as better results,
      // but we want lower times to be considered better
      const finish = finishTime as number
      const timeInSeconds = Math.floor((finish - startTime) / 1000) * -1

      const resultData: GameData = {
        playerLogin: user.login,
        ...achievements.gameData,
        [ratingFieldName]: timeInSeconds,
      }

      sendResultToLeaderboard(resultData, ratingFieldName)
    }

    if (status === 'lost') {
      dispatch(increasePlayedGamesCount())
    }
  }, [status])

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center mb-4">
        <h1 className="w-full max-w-[250px] sm:max-w-xl mb-[42px] sm:mb-[72px] sm:text-xl text-center text-font-color">
          Every click counts! Can you beat the minefield?
        </h1>
      </div>

      <div className="bg-[#BFBFBF] p-2 border-4 border-t-white border-l-white border-r-[#7B7B7B] border-b-[#7B7B7B]">
        <GameHeader
          gameStatus={status}
          minesLeft={minesLeft}
          onFullScreen={handleFullScreen}
          onOpenSettings={handleOpenSettings}
          onReset={handleResetClick}
          startTime={startTime}
        />

        <GameField
          handleClick={gameController.handleCellClick}
          handleDoubleClick={gameController.handleRightClick}
          handleKeyDown={gameController.handleKeyDown}
          handleMouseMove={gameController.handleMouseMove}
          cellSize={32}
        />
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
