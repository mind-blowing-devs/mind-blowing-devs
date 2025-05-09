import axios from 'axios'

export const API_URL = 'http://localhost:5001/api'

export const $axios = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
