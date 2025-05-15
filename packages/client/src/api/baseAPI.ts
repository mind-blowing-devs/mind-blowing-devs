import axios from 'axios'

const serverUrl = process.env.EXTERNAL_SERVER_URL || 'http://localhost:5001'
export const API_URL = `${serverUrl}/api`

export const $axios = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
