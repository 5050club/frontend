import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'team' | 'neutral'

const ThemeContext = createContext<{ theme: Theme; toggle: () => void } | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'team')

  useEffect(() => {
    localStorage.setItem('theme', theme)
    document.documentElement.classList.remove('theme-team', 'theme-neutral')
    document.documentElement.classList.add(theme === 'team' ? 'theme-team' : 'theme-neutral')
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'team' ? 'neutral' : 'team'))

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
