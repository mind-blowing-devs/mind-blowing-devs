import { Link } from 'react-router-dom'
import MenuButton from './components/MenuButton'
import mineIcon from './images/mine-icon.png'
import { useAuth } from '../../hooks/useAuth'

export default function Main() {
  const { logout } = useAuth()
  return (
    <main className="font-press bg-[#BFBFBF] flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
      <h1 className="w-full max-w-[250px] sm:max-w-xl mb-[42px] sm:mb-[72px] sm:text-xl text-center text-[#585656]">
        Welcome to Minesweeper Adventure!
      </h1>

      <div className="border-4 border-[#818181] bg-[#D9D9D9] flex flex-col justify-center items-center relative w-full max-w-xl lg:h-[624px] md:h-[524px] h-[464px] text-xs md:text-base sm:text-sm">
        <img
          className="absolute top-[-115px] sm:left-[-88px] left-[-30px] select-none"
          src={mineIcon}
          width={176}
          height={230}
          alt="Mine Icon"
        />

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
