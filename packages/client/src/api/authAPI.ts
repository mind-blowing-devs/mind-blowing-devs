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

export const signUpApi = async (data: UserSignUpData) => {
  return await $axios.post('/auth/signup', data)
}

export const signIn = async (data: UserSignInData): Promise<void> => {
  return await $axios.post('/auth/signin', data)
}

export const logOut = async (): Promise<void> => {
  return await $axios.post('/auth/logout')
}

export const checkIfAuthed = async (): Promise<User> => {
  const { data } = await $axios.get('/auth/user')
  return data
}
