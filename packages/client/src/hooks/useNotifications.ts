import { useEffect, useRef } from 'react'

export const useNotifications = (status: string) => {
  const notificationRef = useRef<Notification | null>(null)
  const enabledRef = useRef(status === 'playing')

  useEffect(() => {
    enabledRef.current = status === 'playing'
  }, [status])

  useEffect(() => {
    const handlePageLeave = () => {
      if (
        document.visibilityState === 'hidden' &&
        enabledRef.current &&
        Notification.permission === 'granted'
      ) {
        notificationRef.current = new Notification('Minesweeper!', {
          body: 'The game is still on, comeback and defuse these mines!',
          tag: 'come-back',
          icon: 'mine-icon.png',
        })
      } else {
        if (notificationRef.current) {
          notificationRef.current?.close()
          notificationRef.current = null
        }
      }
    }

    if (Notification.permission !== 'granted')
      Notification.requestPermission().then(() =>
        console.log('Permission granted')
      )

    document.addEventListener('visibilitychange', handlePageLeave)

    return () =>
      document.removeEventListener('visibilitychange', handlePageLeave)
  }, [])
}
