import { Link } from 'react-router-dom'
import LeaderboardComponent, { LeaderboardData } from './LeaderboardComponent'

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

export default function Leaderboard() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
      <h1 className="mt-10 sm:text-xl text-center text-font-color">
        Top Minesweeper Players
      </h1>
      <div className="border-4 border-[#818181] bg-[#D9D9D9] p-4 sm:p-6 mt-12 w-full max-w-xl text-xs sm:text-sm md:text-base">
        <LeaderboardComponent userData={mockUserData} dataList={mockDataList} />
      </div>
      <Link
        to="/game"
        className="my-8 hover:text-gray-500 text-xs sm:text-sm"
        aria-label="Back to game page">
        [back to game]
      </Link>
    </main>
  )
}
