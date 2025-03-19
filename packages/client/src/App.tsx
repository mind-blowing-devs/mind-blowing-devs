import { useEffect } from 'react'
import './App.css'
import Main from './pages/Main'
import Error404 from './pages/Error404'
import Error500 from './pages/Error500'
import Forum from './pages/Forum'
import ForumTopic from './pages/ForumTopic'
import Game from './pages/Game'
import Leaderboard from './pages/Leaderboard'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import CreateTopic from './pages/CreateTopic'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import NotAuthedProtectedRoutes from './components/NotAuthedProtectedRoutes'
import AuthedProtectedRoutes from './components/AuthedProtectedRoutes'
import ErrorBoundary from './components/ErrorBoundary'
import { useAppDispatch } from './store/store'
import { setIsFullScreen, toggleFullScreen } from './store/fullscreenSlice'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // const fetchServerData = async () => {
    //   const url = `http://localhost:${__SERVER_PORT__}`
    //   const response = await fetch(url)
    //   const data = await response.json()
    //   console.log(data)
    // }

    // fetchServerData()

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
