import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import './styles/index.css'

// Start the msw mock worker only in local development when VITE_USE_MOCKS is set
if (import.meta.env.DEV && import.meta.env.VITE_USE_MOCKS === 'true') {
  // dynamic import so it's only loaded when needed and removed from production builds
  import('./mocks/browser').then(({ worker }) => {
    worker.start()
  })
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
