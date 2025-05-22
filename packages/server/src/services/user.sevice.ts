import type { User } from '../types'
import axios from 'axios'

export const getYandexUser = async (uuid: string, authCookie: string, url: string) => {
  const response = await axios.get<User>(url, {
    headers: {
      Cookie: `uuid=${uuid}; authCookie=${authCookie}`,
    },
  })

  return { user: response.data, status: response.status }
}
