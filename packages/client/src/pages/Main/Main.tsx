import { Logo, Button } from '../../components'
import { useAuth } from '../../hooks'

export default function Main() {
  const { logout } = useAuth()
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6">
      <h1 className="w-full max-w-[250px] sm:max-w-xl mb-[42px] sm:mb-[72px] sm:text-xl text-center text-font-color">
        Welcome to Minesweeper Adventure!
      </h1>

      <div className="border-4 border-[#818181] bg-[#D9D9D9] flex flex-col justify-center items-center relative w-full max-w-xl h-96 text-xs md:text-base sm:text-sm">
        <Logo />
        <Button
          isLink={true}
          to="/game"
          ariaLabel="Start a game"
          variant="primary"
          className="w-[256px] max-w-xs my-3 sm:my-4">
          play now
        </Button>
        <Button
          isLink={true}
          to="/leaderboard"
          ariaLabel="Leaderboard"
          variant="primary"
          className="w-[256px] max-w-xs my-3 sm:my-4">
          leaderboard
        </Button>
        <Button
          isLink={true}
          to="/profile"
          ariaLabel="Show my profile"
          variant="primary"
          className="w-[256px] max-w-xs my-3 sm:my-4">
          profile
        </Button>
        <Button
          isLink={true}
          to="/forum"
          ariaLabel="Open forum"
          variant="primary"
          className="w-[256px] max-w-xs my-3 sm:my-4">
          forum
        </Button>
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
