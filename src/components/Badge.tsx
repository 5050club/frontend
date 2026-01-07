import React from 'react'

export default function Badge({ children, color = 'green' }: { children: React.ReactNode; color?: 'green' | 'gray' | 'red' }) {
  const bg = color === 'green' ? 'bg-green-100 text-green-800' : color === 'red' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-800'
  return <span className={`inline-block px-2 py-0.5 text-xs font-medium rounded ${bg}`}>{children}</span>
}
