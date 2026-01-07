import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from '../lib/api'

type User = { id: string; email: string }

type AuthContextType = {
  user: User | null
  token: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'))

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      // Optionally fetch user profile
    } else {
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    }
  }, [token])

  const login = async (email: string, password: string) => {
    const res = await axios.post('/auth/login', { email, password })
    setToken(res.data.access_token)
    setUser(res.data.user)
  }

  const register = async (email: string, password: string) => {
    const res = await axios.post('/auth/register', { email, password })
    setToken(res.data.access_token)
    setUser(res.data.user)
  }

  const logout = () => {
    setToken(null)
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, token, login, register, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
