export function formatTime(timestamp: number): string {
  timestamp = Math.abs(timestamp)
  const minutes = Math.floor(timestamp / 60)
  const seconds = timestamp % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
    2,
    '0'
  )}`
}
