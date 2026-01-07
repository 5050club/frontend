import React, { useEffect, useState } from 'react'
import api from '../lib/api'
import { formatKickoffToUserTimezone, hasKickedOff } from '../utils/time'

type Game = {
  id: string
  away_team: string
  home_team: string
  kickoff: string
}

type Pick = {
  id: string
  user_id: string
  user_name?: string
  game_id: string
  pick_team: string
  amount: number
  locked: boolean
}

export default function LeaguePicks() {
  const [games, setGames] = useState<Game[]>([])
  const [picks, setPicks] = useState<Pick[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      const [{ data: gamesRes }, { data: picksRes }] = await Promise.all([
        api.get('/games?week=1'),
        api.get('/league/picks?week=1'),
      ])
      if (!mounted) return
      setGames(gamesRes.games)
      setPicks(picksRes.picks)
      setLoading(false)
    }
    load()
    return () => {
      mounted = false
    }
  }, [])

  if (loading) return <div>Loading league picks...</div>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">League Picks — Week 1</h2>

      <div className="space-y-6">
        {games.map((g) => {
          const kicked = hasKickedOff(g.kickoff)
          const gamePicks = picks.filter((p) => p.game_id === g.id && p.locked)

          return (
            <div key={g.id}>
              {/* Use the GameCard component */}
              <div className="mb-3">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12">
                        <img src={`/src/assets/teams/${g.away_team.toLowerCase().replace(/ /g, '')}.svg`} alt="" className="w-full h-full rounded-md" />
                      </div>
                      <div>
                        <div className="font-semibold text-lg">{g.away_team} <span className="text-sm text-slate-400">@</span> {g.home_team}</div>
                        <div className="text-sm text-slate-500">Kickoff: {formatKickoffToUserTimezone(g.kickoff)}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${kicked ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>{kicked ? 'Visible' : 'Hidden'}</div>
                      <div className="text-sm text-slate-600">{g.spread_favorite_team ? `${g.spread_favorite_team} ${g.spread_favorite_points}` : 'No spread'}</div>
                    </div>
                  </div>
                </div>
              </div>

              {kicked ? (
                <div className="p-4 bg-white rounded-lg shadow-sm fade-transition">
                  {gamePicks.length === 0 ? (
                    <div className="text-sm text-slate-600">No locked picks yet.</div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left text-slate-500">
                            <th className="pb-2">Player</th>
                            <th className="pb-2">Pick</th>
                            <th className="pb-2">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {gamePicks.map((p) => (
                            <tr key={p.id} className="border-t">
                              <td className="py-2">{p.user_name || p.user_id}</td>
                              <td className="py-2">{p.pick_team}</td>
                              <td className="py-2">${p.amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-white rounded-lg shadow-sm text-sm text-slate-600">Picks for this game will become visible at kickoff.</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
