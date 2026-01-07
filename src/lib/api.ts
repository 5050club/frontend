import axios from 'axios'

const baseURL = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

const api = axios.create({
  baseURL,
  withCredentials: true,
})

// If using mock mode, allow the mock worker to receive requests from axios
api.interceptors.request.use((cfg) => cfg)

export default api
