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

export const routes: RouteObject[] = [
  {
    element: <ErrorBoundary />,
    children: [
      {
        element: <App />,
        children: [
          {
            element: <AuthProvider />,
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

export const deprecatedRoutes = createRoutesFromElements(
  <Route element={<ErrorBoundary />}>
    <Route element={<App />}>
      <Route element={<AuthProvider />}>
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
      </Route>
    </Route>
  </Route>
)
