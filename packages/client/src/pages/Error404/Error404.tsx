import { Link } from 'react-router-dom'
import { Logo } from '../../components'

export default function Error404() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
      <p className="w-full max-w-[250px] sm:max-w-xl mb-[42px] sm:mb-[72px] sm:text-xl text-center text-font-color">
        Oops! You hit a mine!
      </p>
      <div className="border-4 border-[#818181] bg-[#D9D9D9] flex justify-center items-center relative w-full max-w-xl h-[50vh]">
        <Logo />
        <h1 className=" text-lg sm:text-xl font-bold">404 (Not Found)</h1>
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
