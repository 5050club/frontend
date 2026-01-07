export function formatKickoffToUserTimezone(isoString: string) {
  const d = new Date(isoString)
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZoneName: 'short',
  }).format(d)
}

export function hasKickedOff(isoString: string) {
  return Date.now() >= new Date(isoString).getTime()
}
