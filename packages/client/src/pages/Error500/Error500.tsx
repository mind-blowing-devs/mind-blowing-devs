import { Link } from 'react-router-dom'

export default function Error500() {
  return (
    <main className="flex h-screen flex-col items-center justify-center px-6 text-center">
      <h1 className="text-6xl font-bold">500</h1>
      <p className="mt-4 text-xl">
        Что-то пошло не так. Мы уже работаем над этим.
      </p>
      <Link
        to="/"
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
        aria-label="Вернуться на главную страницу">
        На главную
      </Link>
    </main>
  )
}
