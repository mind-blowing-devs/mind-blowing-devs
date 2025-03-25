import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import store from './store/store'
import { ThemeProvider } from './components'
import App from './App'

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <ReduxProvider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ReduxProvider>
    </BrowserRouter>
  </StrictMode>
)
