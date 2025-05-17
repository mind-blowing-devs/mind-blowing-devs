import express from 'express'
import fs from 'fs/promises'
import path from 'node:path'
import { createServer as createViteServer, ViteDevServer } from 'vite'
import serialize from 'serialize-javascript'
import type { HelmetData } from 'react-helmet'
import { fileURLToPath, pathToFileURL } from 'node:url'
import dotenv from 'dotenv'

const isDev = process.env.NODE_ENV === 'development'
// We cannot use global __dirname since the output file is not a commonjs format
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// takes .env from the root when in development environment
const envConfig = isDev ? { path: path.resolve(__dirname, '../../../.env') } : undefined
dotenv.config(envConfig)

const port = Number(process.env.CLIENT_PORT) || 5000
const clientPath = path.join(__dirname, '..')
import { Request as ExpressRequest } from 'express'

async function createServer() {
  const app = express()

  let vite: ViteDevServer | undefined
  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
    })
    app.use(vite.middlewares)
  } else {
    app.use(express.static(path.join(clientPath, 'dist/client'), { index: false }))
  }

  app.get(/.*/, async (req, res, next) => {
    const url = req.originalUrl
    const xRequestId = (req.headers['x-request-id'] || '') as string

    try {
      let render: (
        req: ExpressRequest
      ) => Promise<{ html: string; initialState: unknown; helmet: HelmetData }>
      let template: string

      if (vite) {
        // Получаем файл client/index.html
        template = await fs.readFile(path.resolve(clientPath, 'index.html'), 'utf-8')

        // Применяем встроенные HTML-преобразования vite и плагинов
        template = await vite.transformIndexHtml(url, template)

        // Загружаем модуль клиента, он будет рендерить HTML-код
        render = (await vite.ssrLoadModule(path.join(clientPath, 'src/entry-server.tsx'))).render
      } else {
        template = await fs.readFile(path.join(clientPath, 'dist/client/index.html'), 'utf-8')

        // Импортируем этот модуль и вызываем с начальным состоянием
        // entryPath fixes import since we cannot use default ones or __dirname
        const entryPath = pathToFileURL(path.join(clientPath, 'dist/server/entry-server.js')).href
        render = (await import(entryPath)).render
      }

      const { html: appHtml, initialState, helmet } = await render(req)

      // Заменяем комментарий на сгенерированную HTML-строку
      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(
          `<!--ssr-helmet-->`,
          `${helmet.meta.toString()} ${helmet.title.toString()} ${helmet.link.toString()}`
        )
        .replace(
          `<!--ssr-initial-state-->`,
          `<script nonce="${xRequestId}">window.REDUX_INITIAL_STATE = ${serialize(initialState, {
            isJSON: true,
          })}</script>`
        )
        .replace(/\*\*CSP_NONCE\*\*/g, xRequestId)

      // Завершаем запрос и отдаём HTML-страницу
      res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
    } catch (e) {
      if (vite) vite.ssrFixStacktrace(e as Error)
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`➜ Client is listening on port: ${port}`)
  })
}

createServer()
