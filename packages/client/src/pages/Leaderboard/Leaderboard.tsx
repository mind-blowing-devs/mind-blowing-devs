import { useState, useMemo, useCallback } from 'react'

type MockPlayer = {
  id: number
  name: string
  points: number
}

const mockPlayers: MockPlayer[] = [
  { id: 1, name: 'Иван', points: 1500 },
  { id: 2, name: 'Данил', points: 1200 },
  { id: 3, name: 'Маша', points: 900 },
  { id: 4, name: 'Василий', points: 700 },
]

export default function Leaderboard() {
  const [players] = useState<MockPlayer[]>(mockPlayers)
  const [sortKey, setSortKey] = useState<keyof MockPlayer>('id')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const sortedPlayers = useMemo(() => {
    return [...players].sort((a, b) => {
      if (a[sortKey] < b[sortKey]) {
        return sortOrder === 'asc' ? -1 : 1
      }
      if (a[sortKey] > b[sortKey]) {
        return sortOrder === 'asc' ? 1 : -1
      }
      return 0
    })
  }, [players, sortKey, sortOrder])

  const handleSort = useCallback(
    (key: keyof MockPlayer) => {
      setSortOrder(prev => (sortKey === key && prev === 'asc' ? 'desc' : 'asc'))
      setSortKey(key)
    },
    [sortKey]
  )

  const getSortSymbol = (key: keyof MockPlayer) => {
    if (sortKey !== key) {
      return ''
    }
    if (key === 'id') {
      return sortOrder === 'asc' ? '▼' : '▲'
    }
    return sortOrder === 'asc' ? '▲' : '▼'
  }

  return (
    <main className="max-w-2xl mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Leaderboard</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th
              className="w-1/3 p-2 cursor-pointer"
              onClick={() => handleSort('id')}>
              Место {getSortSymbol('id')}
            </th>
            <th
              className="w-1/3 p-2 cursor-pointer"
              onClick={() => handleSort('name')}>
              Игрок {getSortSymbol('name')}
            </th>
            <th
              className="w-1/3 p-2 cursor-pointer"
              onClick={() => handleSort('points')}>
              Очки {getSortSymbol('points')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedPlayers.map(({ id, name, points }) => (
            <tr key={id} className="border-b border-gray-300 text-center">
              <td className="p-2">{id}</td>
              <td className="p-2 flex justify-center">
                <span className="font-medium">{name}</span>
              </td>
              <td className="p-2">{points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}
