import { Link } from 'react-router-dom'

export default function Error500() {
  return (
    <main className="font-press bg-[#BFBFBF] flex h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-bold">500</h1>
      <p className="mt-4 text-xl text-gray-700">Unexpected error. We're on it!</p>
      <Link
        to="/"
        className="mt-8 hover:text-gray-500"
        aria-label="Back to home page">
        [Back Home]
      </Link>
    </main>
  )
}
