import axios from 'axios'

// Function to get the API URL based on environment
const getApiUrl = () => {
  // In browser environment, use the current host but with the API port
  if (typeof window !== 'undefined') {
    const host = window.location.hostname
    return `http://${host}:5001/api`
  }

  // Fallback for SSR/tests
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
