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

export type LoginData = {
  login: string
  password: string
}

export type SignUpData = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

class AuthAPI extends BaseAPI {
  async login(data: LoginData): Promise<void> {
    return this.api.post('/auth/signin',  data )
  }

  async logout(): Promise<void> {
    return this.api.post('/auth/logout')
  }


}

export const authAPI = new AuthAPI()