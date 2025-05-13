import axios from 'axios'

const getApiUrl = () => {
  try {
    if (typeof __EXTERNAL_SERVER_URL__ !== 'undefined' && __EXTERNAL_SERVER_URL__) {
      return `${__EXTERNAL_SERVER_URL__}/api`
    }
  } catch (e) {
    console.warn('Could not access __EXTERNAL_SERVER_URL__, falling back to default')
  }
  return 'http://localhost:5001/api'
}

export const API_URL = getApiUrl()

console.log('API URL:', API_URL) // Log the URL for debugging

export const $axios = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
