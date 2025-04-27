import { type ReactNode, useEffect } from 'react'
import { useAppSelector } from '../../store/store'

type ThemeProviderProps = {
  children: ReactNode
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  const { themes, selectedThemeId } = useAppSelector(state => state.theme)

  useEffect(() => {
    if (themes) {
      const settings = themes.find(item =>
        selectedThemeId ? item.id === selectedThemeId : item.name === 'classic'
      )?.settings

      if (settings) {
        const parsedSettings = JSON.parse(settings) as Record<string, string>

        Object.entries(parsedSettings).forEach(([key, value]) => {
          document.documentElement.style.setProperty(key, value)
        })
      }
    }
  }, [selectedThemeId])

  return <>{children}</>
}
