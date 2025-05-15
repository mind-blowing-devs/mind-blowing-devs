import axios from 'axios'

// Определяем URL API динамически на основе текущего хоста
const getApiUrl = () => {
  // Проверка на запуск в браузере
  if (typeof window !== 'undefined') {
    const host = window.location.hostname
    const port = '5001' // Порт API сервера
    return `http://${host}:${port}/api`
  }
  return 'http://localhost:5001/api' // Для SSR
}

export const API_URL = getApiUrl()

export const $axios = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
