import { BaseAPI } from './baseAPI'

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

class UserAPI extends BaseAPI {
  // Temp
  async getUser(): Promise<User> {
    const { data } = await this.api.get('/auth/user')
    return data
  }

  async changeAvatar(data: FormData): Promise<User> {
    const response = await this.api.put('/user/profile/avatar', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return response.data
  }

  async changePassword(data: ChangePasswordData): Promise<void> {
    await this.api.put('/user/password', data)
  }
}

export const userAPI = new UserAPI()
