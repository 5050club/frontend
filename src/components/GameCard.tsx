import React from 'react'
import { formatKickoffToUserTimezone } from '../utils/time'
import Badge from './Badge'

import React, { useState } from 'react'
import { formatKickoffToUserTimezone } from '../utils/time'
import Badge from './Badge'
import TeamLogo from './TeamLogo'

export default function GameCard({ game, children, picksVisible }: { game: any; children?: React.ReactNode; picksVisible?: boolean }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <button
        onClick={() => setOpen((s) => !s)}
        className="w-full p-4 flex items-center justify-between gap-4 text-left md:cursor-default md:pointer-events-auto"
      >
        <div className="flex items-center gap-3">
          <div className="logo-hover">
            <TeamLogo name={game.away_team} size={48} />
          </div>
          <div>
            <div className="font-semibold text-lg">{game.away_team} <span className="text-sm text-gray-400">@</span> {game.home_team}</div>
            <div className="text-sm text-slate-500">Kickoff: {formatKickoffToUserTimezone(game.kickoff)}</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge color={picksVisible ? 'green' : 'gray'}>{picksVisible ? 'Visible' : 'Hidden'}</Badge>
          {game.spread_favorite_team ? (
            <div className="text-sm text-gray-600">{game.spread_favorite_team} {game.spread_favorite_points}</div>
          ) : (
            <div className="text-sm text-gray-600">No spread</div>
          )}

          <svg className={`w-5 h-5 ml-2 transition-transform ${open ? 'rotate-180' : 'rotate-0'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </button>

      <div className={`px-4 pb-4 collapse-transition ${open ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-2'} overflow-hidden`}>{children}</div>
    </div>
  )
}
