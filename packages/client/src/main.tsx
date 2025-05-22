import './index.css'
import { Provider as ReduxProvider } from 'react-redux'
import store from './store/store'
import { ThemeProvider } from './components'
import ReactDOM from 'react-dom/client'
import { routes } from './routes'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter(routes)

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <ReduxProvider store={store}>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </ReduxProvider>
)
