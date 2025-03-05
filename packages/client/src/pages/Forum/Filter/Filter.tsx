import React from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useSearchParams } from 'react-router-dom'

export default function Filter() {
  const [search, setSearch] = useSearchParams()

  // debounce is an optimization that decreases the number of requests
  //
  const handleInputChange = useDebouncedCallback((query: string) => {
    setSearch({ query })
  }, 300)

  return (
    <div className="font-roboto font-sm flex flex-col items-end self-end gap-[10px] pb-[60px]">
      <div>
        Search: [
        <input
          type="search"
          placeholder="_________________"
          className="bg-transparent outline-none w-[120px]"
          onChange={e => handleInputChange(e.target.value)}
          value={search.get('query') as string}
        />
        ]
      </div>
      <span>Filter by: []</span>
    </div>
  )
}
