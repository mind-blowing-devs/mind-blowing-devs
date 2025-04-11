import { BaseAPI } from './baseAPI'
import type { User } from './userAPI'

export type UserSignUpData = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export type UserSignInData = {
  login: string
  password: string
}

export type OAuthYandexData = {
  code: string
  redirect_uri: string
}

class AuthAPI extends BaseAPI {
  // Temp
  async signUp(data: UserSignUpData) {
    await this.api.post('/auth/signup', data)
  }

  async signIn(data: UserSignInData): Promise<void> {
    await this.api.post('/auth/signin', data)
  }

  async logOut(): Promise<void> {
    await this.api.post('/auth/logout')
  }

  async checkIfAuthed(): Promise<User> {
    const { data } = await this.api.get('/auth/user')
    return data
  }

  async getYandexServiceId(redirect_uri: string): Promise<string> {
    const { data } = await this.api.get('/oauth/yandex/service-id', {
      params: { redirect_uri },
    })
    return data.service_id
  }

  async signInWithYandex(data: OAuthYandexData): Promise<void> {
    await this.api.post('/oauth/yandex', data)
  }
}

export const authAPI = new AuthAPI()
