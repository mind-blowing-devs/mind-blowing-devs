import { $axios } from './baseAPI'

export type User = {
  id: number
  first_name: string
  second_name: string
  display_name: string | null
  phone: string
  login: string
  avatar: string | null
  email: string
}

export type ChangePasswordData = {
  oldPassword: string
  newPassword: string
}

export const changeAvatarApi = async (data: FormData): Promise<User> => {
  const response = await $axios.put('/user/profile/avatar', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return response.data
}

export const changePassword = async (
  data: ChangePasswordData
): Promise<void> => {
  return await $axios.put('/user/password', data)
}
