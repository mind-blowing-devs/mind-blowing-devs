import { FC, useState } from 'react'
import {
  LeaderboardComponent,
  type LeaderboardData,
} from '../../../../components'

import { GameButton } from '../GameButton'

interface IResultModal {
  isOpen: boolean
  onClose: () => void
  cellsRevealed: number
  minesLeft: number
  difficulty: string
  startTime: number
  finishTime: number | undefined
  result: 'won' | 'lost'
}

// Мок-данные
const mockUserData: LeaderboardData = {
  rank: 5,
  name: 'antony',
  time: 730,
}

const mockDataList: LeaderboardData[] = [
  { rank: 1, name: 'duck', time: 115 },
  { rank: 2, name: 'olya', time: 122 },
  { rank: 3, name: 'bombfinder', time: 132 },
  { rank: 4, name: 'misha', time: 190 },
  { rank: 5, name: 'antony', time: 730 },
  { rank: 6, name: 'sasha', time: 790 },
]

function formatTimeDifference(startTime: number, finishTime: number): string {
  const differenceInSeconds = Math.floor((finishTime - startTime) / 1000) // Convert difference to seconds

  const minutes = Math.floor(differenceInSeconds / 60)
  const seconds = differenceInSeconds % 60

  // Format minutes and seconds as a string "MM.SS"
  const formattedMinutes = String(minutes).padStart(2, '0')
  const formattedSeconds = String(seconds).padStart(2, '0')

  return `${formattedMinutes}.${formattedSeconds}`
}

type Tab = 'result' | 'leaderboard'

const ResultModal: FC<IResultModal> = ({
  isOpen,
  onClose,
  result,
  cellsRevealed,
  minesLeft,
  difficulty,
  startTime,
  finishTime,
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('result')

  if (!isOpen) return null

  const isWin = result === 'won'
  const timePlayed = formatTimeDifference(startTime, finishTime ?? Date.now())

  // Функция для отрисовки отдельного таба
  const renderTab = (tab: Tab, label: string) => {
    return (
      <GameButton
        variant="default"
        className={`flex-1 text-center border-b-0 ${
          activeTab === tab ? 'bg-[#d4d4d4]' : 'bg-[#BFBFBF]'
        }`}
        onClick={() => setActiveTab(tab)}>
        {label}
      </GameButton>
    )
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#BFBFBF] p-6 border-4 border-t-white border-l-white border-r-[#7B7B7B] border-b-[#7B7B7B] max-w-md w-full">
        <div className="flex mb-4 border-b border-[#7B7B7B] w-full">
          {renderTab('result', 'result')}
          {renderTab('leaderboard', 'leaderboard')}
        </div>

        {activeTab === 'result' && (
          <>
            {isWin ? (
              <p className="text-xl font-bold mb-4 text-[#0E7A11] text-center select-none">
                Congratulations! The minefield is clear!
              </p>
            ) : (
              <p className="text-xl font-bold mb-4 text-[#FC0D1B] text-center select-none">
                Boom! You hit a mine!
              </p>
            )}

            <div className="space-y-2 mb-6 text-[#585656] text-center">
              <p>Time: {timePlayed}</p>
              <p>Cells cleared: {cellsRevealed}</p>
              <p>Mines remaining: {minesLeft}</p>
              <p>Difficulty: {difficulty}</p>
            </div>
          </>
        )}

        {activeTab === 'leaderboard' && (
          <LeaderboardComponent
            userData={mockUserData}
            dataList={mockDataList}
            isEmbedded={true}
          />
        )}

        <div className="flex justify-end mt-6 gap-2">
          <GameButton onClick={onClose} variant="default">
            close
          </GameButton>
        </div>
      </div>
    </div>
  )
}

export default ResultModal
