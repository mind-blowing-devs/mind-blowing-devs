import axios from "axios"

export class BaseAPI {
  protected api = axios.create({
    baseURL:  'https://ya-praktikum.tech/api/v2',
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  })
}