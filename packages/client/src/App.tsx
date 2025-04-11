import { useEffect, useState } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { useLeaderboardSync, useAuth } from './hooks'
import { useAppDispatch, setIsFullScreen, toggleFullScreen } from './store'

import {
  SignUp,
  SignIn,
  Main,
  Profile,
  Forum,
  ForumTopic,
  CreateTopic,
  Game,
  Leaderboard,
  Error,
} from './pages'

import {
  NotAuthedProtectedRoutes,
  AuthedProtectedRoutes,
  ErrorBoundary,
} from './components'

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
    if ('serviceWorker' in navigator) {
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

  const navigate = useNavigate()
  const { isLogged } = useAuth()

  const privateRoutes = [
    'Forum',
    'ForumTopic',
    'CreateTopic',
    'Game',
    'Leaderboard',
    'Profile',
  ]
  const publicRoutes = ['SignIn', 'SignUp']
  const errorRoutes = ['404', '500']
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
          className={`absolute left-0 top-full w-full sm:max-w-[13rem] bg-white shadow-md transition-all duration-300 z-10 rounded ${
            isDropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}>
          <div>
            {[...privateRoutes, ...publicRoutes, ...errorRoutes].map(page => {
              const isErrorRoute = errorRoutes.includes(page)

              return isErrorRoute ||
                (isLogged && privateRoutes.includes(page)) ||
                (!isLogged && publicRoutes.includes(page)) ? (
                <Link
                  key={page}
                  to={page.toLowerCase()}
                  className="block px-5 py-2 text-black hover:bg-gray-200"
                  onClick={() => setIsDropdownOpen(false)}>
                  {page}
                </Link>
              ) : (
                <h1 key={page} className="block px-5 py-2 text-gray-500">
                  {page}
                </h1>
              )
            })}
          </div>
        </nav>
      </header>
      <ErrorBoundary navigate={navigate}>
        <Routes>
          <Route element={<NotAuthedProtectedRoutes />}>
            <Route index element={<Main />}></Route>
            <Route path="/forum" element={<Forum />}></Route>
            <Route path="/CreateTopic" element={<CreateTopic />}></Route>
            <Route path="/forumtopic" element={<ForumTopic />}></Route>
            <Route path="/game" element={<Game />}></Route>
            <Route path="/leaderboard" element={<Leaderboard />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Route>
          <Route element={<AuthedProtectedRoutes />}>
            <Route path="/signUp" element={<SignUp />}></Route>
            <Route path="/signin" element={<SignIn />}></Route>
          </Route>
          <Route path="*" element={<Error errorCode="404" />}></Route>
          <Route path="/500" element={<Error errorCode="500" />}></Route>
        </Routes>
      </ErrorBoundary>
    </div>
  )
}

export default App
