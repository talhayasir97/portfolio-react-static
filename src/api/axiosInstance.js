import axios from 'axios'

const api = axios.create({
  baseURL: 'https://localhost:7038/api', // apna .NET API port yahan daalein
})

// Automatically attach JWT token to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api