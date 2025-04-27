import { $axiosServerSide } from './baseAPI'

export const getThemes = async () => await $axiosServerSide.get('/visualthemes')

export const getUserTheme = async (userId: string) =>
  await $axiosServerSide.get(`/visualthemes/user/${userId}`)

export const saveUserTheme = async (userId: number, themeId: string) =>
  await $axiosServerSide.post('/visualthemes/user', {
    userId: userId,
    visualThemeId: themeId,
  })
