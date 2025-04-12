import ReactDOM from 'react-dom/server'
import { Request as ExpressRequest } from 'express';
import { StrictMode } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import store from './store/store'
import { ThemeProvider } from './components'
import { routes } from './routes'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server';

import { createFetchRequest } from './entry.server.utils'


export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routes);

  // 2. Создаёт node Request из ExpressRequest
  const fetchRequest = createFetchRequest(req);

  // 3. Создаёт контекст для роутера, в нем будет находиться информация, которая доступна на клиенте «из коробки»
  const context = await query(fetchRequest);

  // 4. Если context — это Response, то приходит к выводу, что сейчас идёт процесс редиректа и поэтому выбрасывает исключение.
  if (context instanceof Response) {
    throw context
  }

  const router = createStaticRouter(dataRoutes, context)


  return ReactDOM.renderToString(
    <StrictMode>
      <ReduxProvider store={store}>
        <ThemeProvider>
          <StaticRouterProvider router={router} context={context} />
        </ThemeProvider>
      </ReduxProvider>
    </StrictMode>
  );
}