import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { createServer as createViteServer, ViteDevServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const port = process.env.PORT || 5000
const clientPath = path.join(__dirname, '..')
const isDev = process.env.NODE_ENV === 'development'
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
    app.use(
      express.static(path.join(clientPath, 'dist/client'), { index: false })
    )
  }

  app.get(/.*/, async (req, res, next) => {
    const url = req.originalUrl

    try {
      let render: (req: ExpressRequest) => Promise<string>
      let template: string

      if (vite) {
        // Получаем файл client/index.html
        template = await fs.readFile(
          path.resolve(clientPath, 'index.html'),
          'utf-8'
        )

        // Применяем встроенные HTML-преобразования vite и плагинов
        template = await vite.transformIndexHtml(url, template)

        // Загружаем модуль клиента, он будет рендерить HTML-код
        const ssrLoadModuleRes = await vite.ssrLoadModule(
          path.join(clientPath, 'src/entry-server.tsx')
        )

        render = ssrLoadModuleRes.render
      } else {
        template = await fs.readFile(
          path.join(clientPath, 'dist/client/index.html'),
          'utf-8'
        )

        // Получаем путь до модуля клиента, чтобы не тащить средства сборки клиента на сервер
        const { href: serverIndexHtmlFileUrl } = new URL(
          './dist/server/entry-server.js',
          `${pathToFileURL(clientPath).href}/`
        )

        // Импортируем этот модуль и вызываем с начальным состоянием
        render = (await import(serverIndexHtmlFileUrl)).render
      }

      // Получаем HTML-строку из JSX
      const appHtml = await render(req)

      // Заменяем комментарий на сгенерированную HTML-строку
      const html = template.replace(`<!--ssr-outlet-->`, appHtml)

      // Завершаем запрос и отдаём HTML-страницу
      res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
    } catch (e) {
      if (vite) vite.ssrFixStacktrace(e as Error)
      next(e)
    }
  })

  app.listen(port, () => {
    console.log(`Client is listening on port: ${port}`)
  })
}

createServer()
