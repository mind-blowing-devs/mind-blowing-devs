export function formatTime(timestamp: number | undefined): string {
  if (timestamp === undefined) {
    return '-'
  }

  timestamp = Math.abs(timestamp)
  const minutes = Math.floor(timestamp / 60)
  const seconds = timestamp % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0'
  )}`
}

export const formatDate = (date: string): string => {
  const formattedDate = new Date(date)

  const formatter = new Intl.DateTimeFormat('en-EN', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return formatter.format(formattedDate)
}
