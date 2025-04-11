import { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useLeaderboardSync } from './hooks'
import { useAppDispatch, setIsFullScreen, toggleFullScreen } from './store'

function App() {
  useLeaderboardSync()

  const dispatch = useAppDispatch()

  useEffect(() => {
    const fullscreenchangeHandler = () =>
      dispatch(setIsFullScreen(Boolean(document.fullscreenElement)))
    const f11KeyDownHandler = (event: KeyboardEvent) => {
      if (event.key === 'F11') {
        event.preventDefault()
        dispatch(toggleFullScreen())
      }
    }
    document.addEventListener('fullscreenchange', fullscreenchangeHandler)
    document.addEventListener('keydown', f11KeyDownHandler)

    return () => {
      document.removeEventListener('fullscreenchange', fullscreenchangeHandler)
      document.removeEventListener('keydown', f11KeyDownHandler)
    }
  }, [])

  const startServiceWorker = () => {
    if (globalThis.navigator && 'serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/service-worker.js')
          .then(registration => {
            console.log(
              'ServiceWorker registration successful with scope: ',
              registration.scope
            )
          })
          .catch((error: string) => {
            console.log('ServiceWorker registration failed: ', error)
          })
      })
    }
  }

  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  startServiceWorker()
  return (
    <div className="App font-press bg-body-color">
      <header
        className="relative w-full hidden xl:block"
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}>
        <button
          className="w-full sm:w-auto px-6 py-2 bg-black text-white"
          onClick={toggleDropdown}>
          Navigation (For devs)
        </button>
        <nav
          className={`absolute left-0 top-full w-full sm:max-w-[13rem] bg-white shadow-md transition-all duration-300 z-10 rounded ${isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}>
          <div>
            {[
              'Forum',
              'ForumTopic',
              'CreateTopic',
              'Game',
              'Leaderboard',
              'Profile',
              'SignIn',
              'SignUp',
              '500',
              '404',
            ].map(page => (
              <Link
                key={page}
                to={page.toLowerCase()}
                className="block px-5 py-2 text-black hover:bg-gray-200"
                onClick={() => setIsDropdownOpen(false)}>
                {page}
              </Link>
            ))}
          </div>
        </nav>
      </header>
      <Outlet />
    </div>
  )
}

export default App
