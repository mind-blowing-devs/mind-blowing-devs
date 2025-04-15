const CACHE_NAME = 'cache-v2'

const filesToCache = ['/mine-icon.png', '/default-avatar.png']

const initCache = async () => {
  try {
    return await caches
      .open(CACHE_NAME)
      .then(cache => cache.addAll(filesToCache))
  } catch (err) {
    console.log(`Cache opening error: ${err}`)
  }
}

const tryNetwork = (request, time) => {
  return new Promise((resolve, rej) => {
    const timer = setTimeout(() => rej, time)

    fetch(request).then(res => {
      clearTimeout(timer)

      if (request.method === 'GET' && request.url.startsWith('http')) {
        const responseClone = res.clone()
        caches.open(CACHE_NAME).then(cache => {
          cache.put(request, responseClone)
        })
      }

      resolve(res)
    }, rej)
  })
}

const getFromCache = async request => {
  try {
    const cache = await caches.open(CACHE_NAME)
    const result = await cache.match(request)
    if (result) {
      return result
    }
    return Promise.reject('no match')
  } catch {
    return Promise.reject('no match')
  }
}

const cleanCache = async () => {
  try {
    const cacheNames = await caches.keys()

    await Promise.all(
      cacheNames.map(cache => {
        if (cache !== CACHE_NAME) {
          return caches.delete(cache)
        }
      })
    )
  } catch (err) {
    console.log(`Cleaning cache error: ${err}`)
  }
}

self.addEventListener('install', event => {
  event.waitUntil(initCache())
})

self.addEventListener('activate', event => {
  event.waitUntil(cleanCache())
})

self.addEventListener('fetch', e => {
  e.respondWith(
    tryNetwork(e.request, 400).catch(() => {
      return getFromCache(e.request)
    })
  )
})
