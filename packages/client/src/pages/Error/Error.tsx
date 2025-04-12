import { Logo } from '../../components'
import { Link } from 'react-router-dom'

export default function Error({ errorCode }: ErrorPageProps) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
      <p className="w-full max-w-[250px] sm:max-w-xl mb-[42px] sm:mb-[72px] sm:text-xl text-center text-font-color">
        {errorCode === '500'
          ? 'Oops! Something exploded on the server!'
          : 'Oops! You hit a mine!'}
      </p>
      <div className="border-4 border-[#818181] bg-[#D9D9D9] flex flex-col sm:flex-row justify-center items-center relative w-full max-w-xl h-[50vh]">
        <Logo />
        <h1 className="text-lg sm:text-xl font-bold">{errorCode}</h1>
        <p className="text-lg sm:text-xl font-bold">
          {errorCode === '500' ? '(Server Error)' : '(Not Found)'}
        </p>
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

interface ErrorPageProps {
  errorCode: string
}
