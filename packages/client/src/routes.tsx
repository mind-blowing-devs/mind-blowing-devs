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
} from './pages';
import {
  NotAuthedProtectedRoutes,
  AuthedProtectedRoutes,
  ErrorBoundary,

} from './components';
import App from './App';
import { AuthProvider } from './hooks';
import { createRoutesFromElements, Route } from 'react-router-dom'


export const routes = createRoutesFromElements(
  <Route element={<ErrorBoundary />} >
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
);
