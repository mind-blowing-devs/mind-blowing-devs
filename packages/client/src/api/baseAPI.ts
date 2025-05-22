import axios from 'axios'

declare global {
  interface Window {
    __API_URL__?: string
  }
}

const getApiUrl = () => {
  if (typeof window !== 'undefined') {
    if (window.__API_URL__) {
      return `${window.__API_URL__}/api`
    }
    // fallback for dev
    return `http://${window.location.hostname}:5001/api`
  }
  // SSR fallback
  return process.env.NODE_ENV === 'production'
    ? 'http://server:5001' // refers to docker container
    : 'http://localhost:5001/api'
}

export const API_URL = getApiUrl()

export const $axios = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
