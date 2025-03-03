import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.BACKEND_API_URL ?? import.meta.env.VITE_LOCAL_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})