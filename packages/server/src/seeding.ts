import { VisualTheme } from './models/visualTheme.model'

export async function seedVisualThemes() {
  const themes = [
    {
      name: 'classic',
      settings: JSON.stringify({
        '--body-color': '#bfbfbf',
        '--font-color': '#585656',
      }),
    },
    {
      name: 'dark',
      settings: JSON.stringify({
        '--body-color': '#585656',
        '--font-color': '#bfbfbf',
      }),
    },
  ]

  for (const theme of themes) {
    await VisualTheme.findOrCreate({
      where: { name: theme.name },
      defaults: theme,
    })
  }
}
