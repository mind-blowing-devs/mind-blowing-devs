import React from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { useSearchParams } from 'react-router-dom'

export default function Filter() {
  const [search, setSearch] = useSearchParams()

  // debounce is an optimization that decreases the number of requests
  // not every letter type causes a request
  const handleInputQueryChange = useDebouncedCallback((query: string) => {
    setSearch({
      ...Object.fromEntries(search.entries()),
      query,
    })
  }, 300)

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearch({
      ...Object.fromEntries(search.entries()),
      sort: e.target.value,
    })
  }

  return (
    <div className="font-roboto font-sm flex flex-col items-end self-end gap-[10px] lg:py-[60px] sm:py-[40px] py-[20px]">
      <div>
        Search: [
        <input
          type="search"
          placeholder="_________________"
          className="bg-transparent outline-none w-[120px]"
          onChange={e => handleInputQueryChange(e.target.value)}
          defaultValue={search.get('query') as string}
        />
        ]
      </div>
      <span>
        Filter by: [
        <select
          defaultValue={search.get('sort') ?? 'all'}
          onChange={handleSortChange}
          className="bg-transparent outline-none w-[120px]">
          <option value="all">All Topics</option>
          <option value="name">Topic</option>
          <option value="author">Author</option>
          <option value="replies">Replies</option>
          <option value="lastPost">Last Post</option>
        </select>
        ]
      </span>
    </div>
  )
}
