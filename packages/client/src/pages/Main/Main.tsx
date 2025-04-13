import { MenuButton } from './components'
import { Logo } from '../../components'
import { useAuth, usePage } from '../../hooks'
import { Helmet } from 'react-helmet'

export default function Main() {
  const { logout } = useAuth()
  usePage({})

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Welcome to Minesweeper Adventure game</title>
        <meta
          name="description"
          content="Minesweeper is a logic puzzle video game genre generally played on personal computers. The game features a grid of clickable tiles, with hidden mines (depicted as naval mines in the original game) dispersed throughout the board. The objective is to clear the board without detonating any mines, with help from clues about the number of neighboring mines in each field."
        />
      </Helmet>
      <h1 className="w-full max-w-[250px] sm:max-w-xl mb-[42px] sm:mb-[72px] sm:text-xl text-center text-font-color">
        Welcome to Minesweeper Adventure!
      </h1>

      <div className="border-4 border-[#818181] bg-[#D9D9D9] flex flex-col justify-center items-center relative w-full max-w-xl h-96 text-xs md:text-base sm:text-sm">
        <Logo />
        <MenuButton to="/game" text="play now" label="Start a game" />
        <MenuButton to="/leaderboard" text="leaderboard" label="Leaderboard" />
        <MenuButton to="/profile" text="profile" label="Show my profile" />
        <MenuButton to="/forum" text="forum" label="Open forum" />
      </div>

      <button
        onClick={logout}
        className="text-sm my-5 sm:my-8 hover:text-gray-500 select-none"
        aria-label="Log out">
        [log out]
      </button>
    </main>
  )
}
