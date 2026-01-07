import React, { useEffect, useState } from 'react'
import api from '../lib/api'

type Standing = { rank: number; user_id: string; name: string; bankroll: number }

export default function Standings() {
  const [standings, setStandings] = useState<Standing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      const { data } = await api.get('/standings?week=1')
      if (!mounted) return
      setStandings(data.standings)
      setLoading(false)
    }
    load()
    return () => {
      mounted = false
    }
  }, [])

  if (loading) return <div>Loading standings...</div>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Standings — Week 1</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {standings.map((s) => (
          <div key={s.user_id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex items-center gap-3 w-2/3">
              <div className="w-12 h-12">
                {/* Avatar component visually */}
                <div className="flex items-center justify-center rounded-full bg-green-700 text-white font-semibold w-12 h-12">{s.name.split(' ').map(n => n[0]).slice(0,2).join('').toUpperCase()}</div>
              </div>
              <div>
                <div className="font-semibold">{s.name}</div>
                <div className="text-xs text-slate-500">Rank #{s.rank}</div>
              </div>
            </div>

            <div className="ml-auto text-right">
              <div className="text-sm text-slate-500">Bankroll</div>
              <div className="font-bold text-lg">${s.bankroll}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
