import { v4 as uuid } from 'uuid'

const now = new Date()
const nextSunday = new Date(now)
nextSunday.setDate(now.getDate() + ((7 - now.getDay()) % 7) + 1) // next week's Sunday
nextSunday.setHours(13, 0, 0, 0) // 1pm UTC approximate kickoff

export type Game = {
  id: string
  timestamp: string
  kickoff: string
  away_team: string
  home_team: string
  spread_favorite_points: number | null
  spread_favorite_team: string | null
  completed: boolean
}

export const gamesWeek1: Game[] = [
  {
    id: uuid(),
    timestamp: new Date().toISOString(),
    kickoff: new Date(nextSunday).toISOString(),
    away_team: 'Dallas Cowboys',
    home_team: 'New York Giants',
    spread_favorite_points: -3.5,
    spread_favorite_team: 'Dallas Cowboys',
    completed: false,
  },
  {
    id: uuid(),
    timestamp: new Date().toISOString(),
    kickoff: new Date(nextSunday.getTime() + 60 * 60 * 1000).toISOString(),
    away_team: 'Green Bay Packers',
    home_team: 'Chicago Bears',
    spread_favorite_points: -7.0,
    spread_favorite_team: 'Green Bay Packers',
    completed: false,
  },
  {
    id: uuid(),
    timestamp: new Date().toISOString(),
    kickoff: new Date(nextSunday.getTime() + 2 * 60 * 60 * 1000).toISOString(),
    away_team: 'New England Patriots',
    home_team: 'Miami Dolphins',
    spread_favorite_points: -1.5,
    spread_favorite_team: 'Miami Dolphins',
    completed: false,
  },
]

// sample users in the league
export type User = { id: string; name: string }
export const users: User[] = [
  { id: 'local-user', name: 'You' },
  { id: 'alice', name: 'Alice' },
  { id: 'bob', name: 'Bob' },
]

// simple in-memory store for picks keyed by user id and week
export type Pick = {
  id: string
  user_id: string
  game_id: string
  pick_team: string
  amount: number
  locked: boolean
  locked_at?: string
  locked_spread?: number | null
}

export const picksStore: Pick[] = [
  // Alice locked a pick on game 1
  {
    id: 'p1',
    user_id: 'alice',
    game_id: gamesWeek1[0].id,
    pick_team: gamesWeek1[0].away_team,
    amount: 10,
    locked: true,
    locked_at: new Date().toISOString(),
    locked_spread: gamesWeek1[0].spread_favorite_points,
  },
  // Bob drafted but not locked on game 1
  {
    id: 'p2',
    user_id: 'bob',
    game_id: gamesWeek1[0].id,
    pick_team: gamesWeek1[0].home_team,
    amount: 5,
    locked: false,
  },
]

export function resetMocks() {
  picksStore.length = 0
  picksStore.push(
    {
      id: 'p1',
      user_id: 'alice',
      game_id: gamesWeek1[0].id,
      pick_team: gamesWeek1[0].away_team,
      amount: 10,
      locked: true,
      locked_at: new Date().toISOString(),
      locked_spread: gamesWeek1[0].spread_favorite_points,
    },
    {
      id: 'p2',
      user_id: 'bob',
      game_id: gamesWeek1[0].id,
      pick_team: gamesWeek1[0].home_team,
      amount: 5,
      locked: false,
    }
  )
}
