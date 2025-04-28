import axios from 'axios'

export const $axios = axios.create({
  baseURL: 'https://ya-praktikum.tech/api/v2',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

export const $axiosTopics = axios.create({
  baseURL: 'http://localhost:5001/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})
