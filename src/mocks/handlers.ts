import { http, HttpResponse } from 'msw'
import { gamesWeek1, picksStore, users } from './fixtures' // Ensure 'users' is exported here

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8000'

export const handlers = [
  // 1. GET games for a week
  http.get(`${API_BASE}/games`, ({ request }) => {
    const url = new URL(request.url)
    const week = url.searchParams.get('week') || '1'
    return HttpResponse.json({ games: gamesWeek1 })
  }),

  // 2. GET picks for current user and week
  http.get(`${API_BASE}/picks`, ({ request }) => {
    const url = new URL(request.url)
    const user_id = url.searchParams.get('user_id') || 'local-user'
    const picks = picksStore.filter((p) => p.user_id === user_id)
    return HttpResponse.json({ picks })
  }),

  // 3. GET league picks (everyone) for a week
  http.get(`${API_BASE}/league/picks`, ({ request }) => {
    const results = picksStore.map((p) => {
      const user = users.find((u) => u.id === p.user_id)
      return { ...p, user_name: user?.name || p.user_id }
    })
    return HttpResponse.json({ picks: results })
  }),

  // 4. GET standings
  http.get(`${API_BASE}/standings`, () => {
    const standings = [
      { rank: 1, user_id: 'alice', name: 'Alice', bankroll: 1200 },
      { rank: 2, user_id: 'local-user', name: 'You', bankroll: 950 },
      { rank: 3, user_id: 'bob', name: 'Bob', bankroll: 800 },
    ]
    return HttpResponse.json({ standings })
  }),

  // 5. POST draft a pick (not locked)
  http.post(`${API_BASE}/picks/draft`, async ({ request }) => {
    const body = await request.json() as any
    const pick = {
      id: Math.random().toString(36).slice(2),
      user_id: body.user_id || 'local-user',
      game_id: body.game_id,
      pick_team: body.pick_team,
      amount: body.amount,
      locked: false,
    }
    picksStore.push(pick)
    return HttpResponse.json({ pick }, { status: 201 })
  }),

  // 6. POST lock-in a pick
  http.post(`${API_BASE}/picks/lock`, async ({ request }) => {
    const body = await request.json() as any
    const pick = picksStore.find((p) => p.id === body.pick_id)
    
    if (!pick) {
      return HttpResponse.json({ detail: 'pick not found' }, { status: 404 })
    }

    const game = gamesWeek1.find((g) => g.id === pick.game_id)
    if (!game) {
      return HttpResponse.json({ detail: 'game not found' }, { status: 404 })
    }

    const kickoff = new Date(game.kickoff).getTime()
    if (Date.now() >= kickoff) {
      return HttpResponse.json({ detail: 'game already kicked off' }, { status: 400 })
    }

    pick.locked = true
    pick.locked_at = new Date().toISOString()
    pick.locked_spread = game.spread_favorite_points
    pick.amount = body.amount
    
    return HttpResponse.json({ pick })
  }),
]