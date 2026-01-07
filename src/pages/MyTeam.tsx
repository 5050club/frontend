import React, { useEffect, useMemo, useState } from 'react'
import api from '../lib/api'
import { formatKickoffToUserTimezone, hasKickedOff } from '../utils/time'

type Game = {
  id: string
  away_team: string
  home_team: string
  kickoff: string
  spread_favorite_points: number | null
  spread_favorite_team: string | null
}

type Pick = {
  id: string
  game_id: string
  pick_team: string
  amount: number
  locked: boolean
  locked_at?: string
}

export default function MyTeam() {
  const [games, setGames] = useState<Game[]>([])
  const [picks, setPicks] = useState<Record<string, Pick>>({})
  const [loading, setLoading] = useState(true)

  // fetch games and existing picks
  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      const [{ data: gamesRes }, { data: picksRes }] = await Promise.all([
        api.get('/games?week=1'),
        api.get('/picks?week=1&user_id=local-user'),
      ])
      if (!mounted) return
      setGames(gamesRes.games)
      const picksObj: Record<string, Pick> = {}
      picksRes.picks.forEach((p: Pick) => (picksObj[p.game_id] = p))
      setPicks(picksObj)
      setLoading(false)
    }
    load()
    return () => {
      mounted = false
    }
  }, [])

  const bankroll = useMemo(() => (games.length ? games.length * 10 : 0), [games])

  const totalLocked = useMemo(() => {
    return Object.values(picks).reduce((s, p) => s + (p.locked ? p.amount : 0), 0)
  }, [picks])

  const remaining = Math.max(0, bankroll - totalLocked)

  const handleDraft = async (game_id: string, pick_team: string, amount: number) => {
    // save draft locally and to mock API
    const res = await api.post('/picks/draft', { user_id: 'local-user', game_id, pick_team, amount })
    setPicks((prev) => ({ ...prev, [game_id]: res.data.pick }))
  }

  const handleLock = async (game_id: string) => {
    const p = picks[game_id]
    if (!p) return alert('No draft to lock')
    if (p.amount < 1) return alert('Minimum lock amount is $1')
    if (p.amount > remaining + (p.locked ? p.amount : 0)) return alert('Not enough bankroll to lock this amount')

    // call API to lock
    const res = await api.post('/picks/lock', { pick_id: p.id, amount: p.amount })
    setPicks((prev) => ({ ...prev, [game_id]: res.data.pick }))
  }

  const updateDraftAmount = (game_id: string, amount: number) => {
    setPicks((prev) => ({ ...prev, [game_id]: { ...(prev[game_id] || { id: '', game_id, pick_team: '', amount: 0, locked: false }), amount } }))
  }

  const updateDraftTeam = (game_id: string, team: string) => {
    setPicks((prev) => ({ ...prev, [game_id]: { ...(prev[game_id] || { id: '', game_id, pick_team: '', amount: 0, locked: false }), pick_team: team } }))
  }

  if (loading) return <div>Loading games...</div>

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Team — Week 1 Picks</h2>
      <div className="mb-4">
        <strong>Week bankroll:</strong> ${bankroll} • <strong>Locked total:</strong> ${totalLocked} • <strong>Remaining:</strong> ${remaining}
      </div>

      <div className="space-y-4">
        {games.map((g) => {
          const p = picks[g.id]
          const kicked = hasKickedOff(g.kickoff)
          return (
            <div key={g.id}>
              <div className="mb-2">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="md:flex md:items-center md:justify-between p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12">
                        <img src={`/src/assets/teams/${g.away_team.toLowerCase().replace(/ /g, '')}.svg`} alt="" className="w-full h-full rounded-md" />
                      </div>
                      <div>
                        <div className="font-semibold">{g.away_team} <span className="text-sm text-slate-400">@</span> {g.home_team}</div>
                        <div className="text-sm text-slate-500">Kickoff: {formatKickoffToUserTimezone(g.kickoff)}</div>
                      </div>
                    </div>

                    <div className="mt-3 md:mt-0 flex items-center gap-3">
                      <div className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${kicked ? 'bg-green-100 text-green-800' : 'bg-slate-100 text-slate-800'}`}>{kicked ? 'Visible' : 'Hidden'}</div>
                      <div className="text-sm text-slate-600">{g.spread_favorite_team ? `${g.spread_favorite_team} ${g.spread_favorite_points}` : 'No spread'}</div>
                    </div>
                  </div>

                  <div className="px-4 pb-4 collapse-transition max-h-96 overflow-hidden">
                    <div className="mt-3 flex flex-col md:flex-row md:items-center gap-4 fade-transition">
                      <div>
                        <label className="block text-sm">Pick</label>
                        <select
                          value={p?.pick_team || ''}
                          onChange={(e) => updateDraftTeam(g.id, e.target.value)}
                          disabled={kicked || (p?.locked ?? false)}
                          className="border p-1 rounded"
                        >
                          <option value="">-- choose --</option>
                          <option value={g.away_team}>{g.away_team}</option>
                          <option value={g.home_team}>{g.home_team}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm">Amount</label>
                        <input
                          type="number"
                          min={0}
                          value={p?.amount ?? 0}
                          onChange={(e) => updateDraftAmount(g.id, Number(e.target.value))}
                          disabled={kicked || (p?.locked ?? false)}
                          className="border p-1 w-24 rounded"
                        />
                      </div>

                      <div className="flex flex-col gap-2 md:ml-auto">
                        <button
                          className="px-3 py-1 bg-slate-200 rounded"
                          onClick={() => handleDraft(g.id, p?.pick_team || '', p?.amount || 0)}
                          disabled={kicked || (p?.locked ?? false)}
                        >
                          Save Draft
                        </button>

                        <button
                          className="px-3 py-1 bg-green-700 text-white rounded"
                          onClick={() => handleLock(g.id)}
                          disabled={kicked || (p?.locked ?? false)}
                          title={kicked ? 'Game already kicked off' : ''}
                        >
                          {p?.locked ? 'Locked' : 'Lock In'}
                        </button>
                      </div>

                      {p?.locked && <div className="text-sm text-green-700">Locked ${p.amount}</div>}
                      {kicked && <div className="text-sm text-red-600">Game kicked off</div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
