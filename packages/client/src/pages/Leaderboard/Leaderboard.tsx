import { Link } from 'react-router-dom'
import { useState } from 'react'
import { LeaderboardTable } from '../../components'
import { useAppSelector } from '../../store'

const selectOptions = ['beginner', 'intermediate', 'expert']

export default function Leaderboard() {
  const { difficulty } = useAppSelector(state => state.gameState)
  const [level, setLevel] = useState(difficulty)

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
      <h1 className="mt-10 sm:text-xl text-center text-font-color">
        Top 10 Minesweeper Players
      </h1>
      <h2 className="mt-2 sm:text-xl text-center text-font-color">
        {level} level
      </h2>
      <div className="border-4 border-[#818181] bg-[#D9D9D9] p-4 sm:p-6 mt-12 w-full max-w-xl text-xs sm:text-sm md:text-base">
        <div className="flex flex-col items-center">
          <div className="bg-[#BFBFBF] p-6 rounded-full mb-6 w-36 h-36 flex justify-center items-center">
            <svg
              className="w-20 h-20"
              width="90"
              height="90"
              viewBox="0 0 90 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.837 4.80835V8.48532C11.3653 9.11957 6.94108 9.89953 2.56872 10.8123C1.75046 10.9843 1.03093 11.4635 0.560661 12.1496C0.0903938 12.8357 -0.0941822 13.6756 0.0455453 14.4936C1.13676 20.8534 4.33905 26.6692 9.14377 31.0173C13.9485 35.3654 20.0801 37.9964 26.5648 38.4925C30.0171 41.291 34.072 43.2647 38.416 44.2608C38.0031 49.1249 36.3482 53.8046 33.6073 57.8587H30.4144C25.9383 57.8587 22.3134 61.4585 22.3134 65.894V77.1435H19.0731C16.4949 77.1435 14.0222 78.1594 12.1992 79.9677C10.3761 81.776 9.35192 84.2285 9.35192 86.7859C9.35192 88.5601 10.8036 90 12.5923 90H77.3999C78.2593 90 79.0835 89.6614 79.6912 89.0586C80.2989 88.4558 80.6403 87.6383 80.6403 86.7859C80.6403 84.2285 79.6161 81.776 77.793 79.9677C75.97 78.1594 73.4974 77.1435 70.9192 77.1435H67.6788V65.894C67.6788 61.4542 64.0495 57.8587 59.5778 57.8587H56.385C53.6453 53.8043 51.9919 49.1245 51.5806 44.2608C55.9249 43.2634 59.9798 41.2883 63.4317 38.4882C69.9172 37.993 76.0498 35.3624 80.8554 31.0143C85.661 26.6661 88.8639 20.8498 89.9553 14.4893C90.0937 13.6714 89.9079 12.832 89.4369 12.1468C88.9659 11.4615 88.246 10.9834 87.4278 10.8123C83.0336 9.89163 78.6099 9.11553 74.1639 8.48532V4.80406C74.1635 4.02015 73.8743 3.26339 73.3508 2.67618C72.8272 2.08897 72.1053 1.7118 71.321 1.61564C62.5882 0.537336 53.7963 -0.00224724 44.9961 7.03408e-06C36.0829 7.03408e-06 27.2993 0.548553 18.6713 1.61564C17.8877 1.71277 17.1668 2.09036 16.6442 2.67747C16.1215 3.26458 15.8329 4.0208 15.8327 4.80406L15.837 4.80835ZM15.837 16.075C15.837 21.2004 17.185 26.0173 19.5397 30.1914C16.6193 28.8925 14.008 26.9969 11.8765 24.6287C9.74506 22.2604 8.14131 19.4728 7.17006 16.4478C10.0477 15.8939 12.9374 15.4038 15.837 14.9779V16.075ZM74.1639 16.075V14.9779C77.0759 15.4064 79.9663 15.895 82.8308 16.4478C81.8598 19.4729 80.2561 22.2607 78.1246 24.6289C75.9931 26.9972 73.3817 28.8927 70.4612 30.1914C72.8962 25.8791 74.1714 21.0176 74.1639 16.075Z"
                fill="black"
              />
            </svg>
          </div>
        </div>

        <div className="flex justify-end mb-6 mt-2 relative">
          <select
            className="bg-[#BFBFBF] appearance-none px-5 py-1 pr-8 border-2 border-t-[#7B7B7B] border-l-[#7B7B7B] border-r-white border-b-white focus:outline-none cursor-pointer"
            onChange={e => setLevel(e.target.value as typeof difficulty)}
            value={level}>
            {selectOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <span className="text-gray-700">▼</span>
          </div>
        </div>
        <LeaderboardTable level={level} />
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
