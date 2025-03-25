import { useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { AuthProvider } from './hooks'
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
  Error404,
  Error500,
} from './pages'

import {
  NotAuthedProtectedRoutes,
  AuthedProtectedRoutes,
  ErrorBoundary,
} from './components'

function App() {
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

  startServiceWorker()

  const navigate = useNavigate()
  return (
    <div className="App font-press bg-body-color">
      <nav className="font-roboto">
        <ul className="px-6 absolute">
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
            <li key={page}>
              <Link to={page}>{page}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <ErrorBoundary navigate={navigate}>
        <AuthProvider>
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
            <Route path="*" element={<Error404 />}></Route>
            <Route path="/500" element={<Error500 />}></Route>
          </Routes>
        </AuthProvider>
      </ErrorBoundary>
    </div>
  )
}

export default App
