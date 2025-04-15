import ReactDOM from 'react-dom/server'
import { Request as ExpressRequest } from 'express'
import { Provider as ReduxProvider } from 'react-redux'
import { reducer } from './store'
import { ThemeProvider } from './components'
import { routes } from './routes'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'

import { createFetchRequest, createUrl } from './entry.server.utils'
import { Helmet } from 'react-helmet'
import { configureStore } from '@reduxjs/toolkit'
import { matchRoutes } from 'react-router-dom'
import { setPageHasBeenInitializedOnServer } from './store/ssrSlice'

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routes)
  const fetchRequest = createFetchRequest(req)
  const context = await query(fetchRequest)

  // redirect
  if (context instanceof Response) {
    throw context
  }

  const store = configureStore({ reducer })

  const url = createUrl(req)

  const foundRoutes = matchRoutes(routes, url)
  if (!foundRoutes) {
    throw new Error('Route not found')
  }

  store.dispatch(setPageHasBeenInitializedOnServer(true))

  const router = createStaticRouter(dataRoutes, context)

  const html = ReactDOM.renderToString(
    <ReduxProvider store={store}>
      <ThemeProvider>
        <StaticRouterProvider router={router} context={context} />
      </ThemeProvider>
    </ReduxProvider>
  )

  const helmet = Helmet.renderStatic()

  return {
    html,
    helmet,
    initialState: store.getState(),
  }
}
