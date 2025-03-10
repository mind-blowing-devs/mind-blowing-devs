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
import { Routes, Route, Link } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'
import ProtectedRoutes from './components/ProtectedRoutes'

function App() {
  useEffect(() => {
    const fetchServerData = async () => {
      const url = `http://localhost:${__SERVER_PORT__}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
    }

    fetchServerData()
  }, [])
  return (
    <div className="App">
      <nav>
        <ul className="px-6 absolute">
          {[
            'Forum',
            'ForumTopic',
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
      <AuthProvider>
        <Routes>
          {/* <Route index element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }></Route> */}
          <Route element={<ProtectedRoutes />}>
            <Route index element={<Main />}></Route>
            <Route path="/forum" element={<Forum />}></Route>
            <Route path="/forumtopic" element={<ForumTopic />}></Route>
            <Route path="/game" element={<Game />}></Route>
            <Route path="/leaderboard" element={<Leaderboard />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="*" element={<Error404 />}></Route>
          <Route path="/500" element={<Error500 />}></Route>
          <Route path="/signUp" element={<SignUp />}></Route>
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App
