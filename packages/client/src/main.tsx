import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import store from './store/store'
import { ThemeProvider } from './components'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <React.StrictMode>
      <ReduxProvider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </ReduxProvider>
    </React.StrictMode>
  </BrowserRouter>
)
