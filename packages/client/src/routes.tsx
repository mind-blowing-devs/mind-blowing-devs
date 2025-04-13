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
import App from './App'
import { AuthProvider } from './hooks'
import { AppDispatch, RootState } from './store'
import { createRoutesFromElements, Route } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

export type PageInitContext = {
  clientToken?: string
}

export type PageInitArgs = {
  dispatch: AppDispatch
  state: RootState
  ctx: PageInitContext
}

// Add fetchData filed to a page for preloading state on the server
// Preloader should be defined in a (page.tsx) and be imported here
// Спринт 9/11: Спринт 7 → Тема 4/8: Server Side Rendering → Урок 7/12: Redux и серверный роутинг
// https://practicum.yandex.ru/trainer/middle-frontend/lesson/a0677cf8-5ce7-4100-bfa8-26a8c75e11eb/#d8f8e0b0-fa84-4687-95bc-9cf5c74b1d44

export const routes: RouteObject[] = [
  {
    element: <ErrorBoundary />,
    children: [
      {
        element: <AuthProvider />,
        children: [
          {
            element: <App />,
            children: [
              {
                element: <NotAuthedProtectedRoutes />,
                children: [
                  {
                    index: true,
                    element: <Main />,
                  },
                  {
                    path: '/forum',
                    element: <Forum />,
                  },
                  {
                    path: '/CreateTopic',
                    element: <CreateTopic />,
                  },
                  {
                    path: '/forumtopic',
                    element: <ForumTopic />,
                  },
                  {
                    path: '/game',
                    element: <Game />,
                  },
                  {
                    path: '/leaderboard',
                    element: <Leaderboard />,
                  },
                  {
                    path: '/profile',
                    element: <Profile />,
                  },
                ],
              },
              {
                element: <AuthedProtectedRoutes />,
                children: [
                  {
                    path: '/signUp',
                    element: <SignUp />,
                  },
                  {
                    path: '/signin',
                    element: <SignIn />,
                  },
                ],
              },
              {
                path: '*',
                element: <Error errorCode="404" />,
              },
              {
                path: '/500',
                element: <Error errorCode="500" />,
              },
            ],
          },
        ],
      },
    ],
  },
]
