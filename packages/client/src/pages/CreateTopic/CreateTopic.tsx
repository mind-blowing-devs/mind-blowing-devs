import React from 'react'
import { Link } from 'react-router-dom'
import TitleInput from './components/TitleInput'
import DescriptionInput from './components/DescriptionInput'
import CategoryInput from './components/CategoryInput'

export default function CreateTopic() {
  return (
    <main className="bg-[#BFBFBF] flex flex-col items-center justify-center min-h-screen p-4 sm:p-[50px]">
      <h2 className="w-full mb-[5px] sm:mb-[13px] sm:text-xl text-[#585656]">
        Minesweeper Forum
      </h2>
      <span className="font-roboto font-sm w-full sm:text-base text-black lg:mb-[60px] sm:mb-[30px] mb-[10px]">
        Discuss strategies, share tips, and connect with other players!
      </span>

      <div className="border-4 border-[#818181] bg-[#D9D9D9] flex flex-col justify-center items-center relative w-full lg:px-[32px] md:px-[15px] px-[10px] text-xs md:text-base sm:text-sm overflow-y-auto">
        <h3 className="font-roboto font-semibold w-full my-[2px] sm:my-[4px] lg:my-[12px] text-lg lg:text-xl sm:text-lg text-black sm:text-center text-left">
          Create New Topic
        </h3>
        <span className="font-roboto w-full font-sm lg:text-lg sm:text-sm sm:mb-[10px] mb-[5px] text-black sm:text-center text-left">
          Share your thoughts, ask questions or start a discussion!
        </span>

        <form className="w-full flex flex-col items-start mb-[10px]">
          <TitleInput />
          <CategoryInput />
          <DescriptionInput />
        </form>
      </div>

      <nav className="flex flex-col items-center gap-[16px] my-5 sm:my-8">
        {/* TODO: fetch fresh data */}
        <button
          className="font-press text-sm hover:text-gray-500 select-none"
          onClick={() => alert('Not implemented')}>
          [create topic]
        </button>

        <Link
          to="/forum"
          className="font-press text-sm hover:text-gray-500 select-none"
          aria-label="Back to Forum">
          [cancel]
        </Link>

        <Link
          to="/forum"
          className="font-press text-sm text-green-700 hover:text-gray-500 select-none"
          aria-label="Back to Forum">
          [back to forum]
        </Link>
      </nav>
    </main>
  )
}
