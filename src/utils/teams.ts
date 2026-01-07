export const teamMap: Record<string, { short: string; logo: string; color: string }> = {
  'Dallas Cowboys': { short: 'DAL', logo: '/src/assets/teams/cowboys.svg', color: '#041E42' },
  'New York Giants': { short: 'NYG', logo: '/src/assets/teams/giants.svg', color: '#0B2265' },
  'Green Bay Packers': { short: 'GB', logo: '/src/assets/teams/packers.svg', color: '#203731' },
  'Chicago Bears': { short: 'CHI', logo: '/src/assets/teams/bears.svg', color: '#0B233F' },
  'New England Patriots': { short: 'NE', logo: '/src/assets/teams/patriots.svg', color: '#0A2342' },
  'Miami Dolphins': { short: 'MIA', logo: '/src/assets/teams/dolphins.svg', color: '#008E97' },
}

export function getTeam(name?: string) {
  if (!name) return null
  return teamMap[name] || { short: name.slice(0, 3).toUpperCase(), logo: '', color: '#666' }
}
