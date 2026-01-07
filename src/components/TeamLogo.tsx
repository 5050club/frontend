import React from 'react'
import { getTeam } from '../utils/teams'

export default function TeamLogo({ name, size = 48 }: { name: string; size?: number }) {
  const info = getTeam(name)
  if (!info) return <div style={{ width: size, height: size }} />
  return (
    <div style={{ width: size, height: size }} className="rounded-md overflow-hidden">
      {info.logo ? <img src={info.logo} alt={info.short} width={size} height={size} /> : <div style={{ backgroundColor: info.color, width: size, height: size }} />}
    </div>
  )
}
