import { useEffect, useState } from 'react'
import { formatTime } from '../../utils'
import {
  getRatingFieldName,
  leaderboardAPI,
  type LeaderboardData,
  type GetLeaderboardData,
  type Difficulty,
} from '../../api'
import { useAppSelector } from '../../store'

import { AppSpinner } from '../AppSpinner'

type LeaderboardTableProps = {
  isEmbedded?: boolean // Флаг для встраивания в модальное окно
  level?: Difficulty
}

export default function LeaderboardTable({
  isEmbedded = false,
  level,
}: LeaderboardTableProps) {
  const { difficulty } = useAppSelector(state => state.gameState)
  const { user, achievements } = useAppSelector(state => state.user)

  const [isLoadingTable, setIsLoadingTable] = useState(true)
  const [table, setTable] = useState<LeaderboardData>([])

  const ratingFieldName = getRatingFieldName(level ?? difficulty)

  const userBestTime = achievements.gameData[ratingFieldName]

  // Классы для адаптации под встраиваемый режим
  const tableClasses = isEmbedded
    ? 'mt-2 w-full border-collapse border border-gray-300 text-sm'
    : 'mt-4 w-full border-collapse border border-gray-300'

  const getLeaderboard = async (data: Partial<GetLeaderboardData>) => {
    try {
      setIsLoadingTable(true)
      const leaderboard = await leaderboardAPI.getLeaderboard(data)
      setTable(leaderboard)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoadingTable(false)
    }
  }

  useEffect(() => {
    getLeaderboard({
      ratingFieldName,
      cursor: 0,
      limit: 10,
    })
  }, [level])

  return (
    <div className={isEmbedded ? '' : 'flex flex-col items-center'}>
      <div className="space-y-2 mb-2 text-[#585656]">
        <div className="flex gap-4">
          <span>Your best time:</span>
          <span>{formatTime(userBestTime)}</span>
        </div>
      </div>

      {isLoadingTable ? (
        <AppSpinner />
      ) : table.length ? (
        <table className={tableClasses}>
          <thead>
            <tr>
              <th className={isEmbedded ? 'w-[5em] p-1' : 'w-[8em] p-1'}>#</th>
              <th className="p-1 text-center">name</th>
              <th className="p-1 text-center">time</th>
            </tr>
          </thead>
          <tbody>
            {table.map(({ data }, index) => (
              <tr
                key={data.playerLogin}
                className={`text-center ${
                  user?.login === data.playerLogin ? 'text-[#0E7A11]' : ''
                }`}>
                <td className="p-1">{index + 1}</td>
                <td className="p-1">{data?.playerLogin}</td>
                <td className="p-1">
                  {formatTime(Number(data[ratingFieldName]))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="mt-4">no data</p>
      )}
    </div>
  )
}
