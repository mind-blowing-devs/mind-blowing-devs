import { Link } from 'react-router-dom'
import TopicsList from './TopicsList'
import Filter from './Filter'
import type { TopicItemProps } from './TopicsList'

const mockData: TopicItemProps[] = [
  {
    id: 1,
    name: 'Best Strategies...',
    author: 'Player123',
    replies: 12,
    lastPost: '2025-01-01',
  },
  {
    id: 2,
    name: 'Как не взорваться напрочь?',
    author: 'MineMaster',
    replies: 4,
    lastPost: '2024-10-22',
  },
  {
    id: 4,
    name: 'Вы слышали про mind-blowing-devs ',
    author: 'You',
    replies: 1212,
    lastPost: '2023-10-01',
  },
  {
    id: 3,
    name: 'Бум или Бах?',
    author: 'SweeperPro',
    replies: 124124,
    lastPost: '1998-10-21',
  },
]

export default function Forum() {
  return (
    <main className="bg-[#BFBFBF] flex flex-col items-center justify-center min-h-screen p-4 sm:p-[50px]">
      <h2 className="font-press w-full mb-[5px] sm:mb-[13px] sm:text-xl text-[#585656]">
        Minesweeper Forum
      </h2>
      <span className="font-roboto font-sm w-full sm:text-base text-black lg:mb-[60px] sm:mb-[30px] mb-[10px]">
        Discuss strategies, share tips, and connect with other players!
      </span>

      <div className="border-4 border-[#818181] bg-[#D9D9D9] flex flex-col justify-center items-center relative w-full lg:px-[32px] md:px-[15px] px-[10px] pb-[35px] text-xs md:text-base sm:text-sm overflow-y-auto">
        <Filter />
        <TopicsList topics={mockData} />
      </div>

      <nav className="flex flex-col items-center gap-[16px] my-5 sm:my-8">
        <Link
          to="/createtopic"
          className="font-press text-sm hover:text-gray-500 select-none"
          aria-label="New topic">
          [new topic]
        </Link>

        {/* TODO: fetch fresh data */}
        <button
          className="font-press text-sm hover:text-gray-500 select-none"
          onClick={() => alert('Not implemented')}>
          [refresh]
        </button>

        <Link
          to="/game"
          className="font-press text-sm text-green-700 hover:text-gray-500 select-none"
          aria-label="Back to Game">
          [back to game]
        </Link>
      </nav>
    </main>
  )
}
