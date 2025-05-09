import { $axios } from './baseAPI'
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

export const signUpApi = async (data: UserSignUpData) => {
  return await $axios.post('/yandex/auth/signup', data)
}

export const signIn = async (data: UserSignInData): Promise<void> => {
  return await $axios.post('/yandex/auth/signin', data)
}

export const logOut = async (): Promise<void> => {
  return await $axios.post('/yandex/auth/logout')
}

export const checkIfAuthed = async (): Promise<User> => {
  const { data } = await $axios.get('/yandex/auth/user')
  return data
}

export const getYandexServiceId = async (redirect_uri: string): Promise<string> => {
  const { data } = await $axios.get('/yandex/oauth/yandex/service-id', {
    params: { redirect_uri },
  })
  return data.service_id
}

export const signInWithYandex = async (data: OAuthYandexData): Promise<void> => {
  return await $axios.post('/yandex/oauth/yandex', data)
}
