import { Link } from 'react-router-dom'

export default function Error500() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
      <p className="w-full max-w-[250px] sm:max-w-xl mb-[42px] sm:mb-[72px] sm:text-xl text-center text-font-color">
        Oops! Something exploded on the server!
      </p>
      <div className="border-4 border-[#818181] bg-[#D9D9D9] flex flex-col sm:flex-row justify-center items-center relative w-full max-w-xl h-[50vh]">
        <img
          className="absolute top-[-66px] sm:top-[-80px] sm:left-[-88px] left-[-50px] select-none"
          src="/mine-icon.png"
          width={176}
          height={230}
          alt="Mine Icon"
        />
        <h1 className="text-lg sm:text-xl font-bold">500</h1>
        <p className="text-lg sm:text-xl font-bold">(Server Error)</p>
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
