import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Main from './pages/Main'
import MyTeam from './pages/MyTeam'
import LeaguePicks from './pages/LeaguePicks'
import Standings from './pages/Standings'
import { useAuth } from './contexts/AuthContext'
import ThemeToggle from './components/ThemeToggle'

export default function App() {
  const { user } = useAuth()
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-green-800 text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">5050 Club</h1>
          <nav className="flex items-center gap-2">
            <Link className="px-3" to="/">Home</Link>
            {user ? (
              <>
                <Link className="px-3" to="/main">League</Link>
                <Link className="px-3" to="/my-team">My Team</Link>
                <Link className="px-3" to="/league-picks">League Picks</Link>
                <Link className="px-3" to="/standings">Standings</Link>
              </>
            ) : (
              <>
                <Link className="px-3" to="/login">Login</Link>
                <Link className="px-3" to="/register">Register</Link>
              </>
            )}
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main" element={<Main />} />
          <Route path="/my-team" element={<MyTeam />} />
          <Route path="/league-picks" element={<LeaguePicks />} />
          <Route path="/standings" element={<Standings />} />
        </Routes>
      </main>

      <footer className="bg-slate-100 text-sm text-center py-6 mt-10">© 5050 Club</footer>
    </div>
  )
}
