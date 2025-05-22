import { type ReactNode, useEffect } from 'react'
import { useAppSelector } from '../../store/store'

type ThemeProviderProps = {
  children: ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme } = useAppSelector(state => state.theme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return <>{children}</>
}
