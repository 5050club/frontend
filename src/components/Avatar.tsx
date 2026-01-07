import React from 'react'

export default function Avatar({ name, size = 40, bg = '#047857' }: { name: string; size?: number; bg?: string }) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  return (
    <div
      style={{ width: size, height: size, backgroundColor: bg }}
      className="flex items-center justify-center rounded-full text-white font-semibold"
    >
      {initials}
    </div>
  )
}
