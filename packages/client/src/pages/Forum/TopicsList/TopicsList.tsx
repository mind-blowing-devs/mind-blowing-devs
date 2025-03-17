import TopicItem from './TopicItem'
import type { TopicItemProps } from './TopicItem'
import { useSearchParams } from 'react-router-dom'

interface TopicsListProps {
  topics: TopicItemProps[]
}

export default function TopicsList({ topics }: TopicsListProps) {
  const [search] = useSearchParams()

  const filteredTopics = filterTopics(
    topics,
    search.get('query'),
    search.get('sort')
  )

  return (
    <table className="w-full font-press">
      <thead>
        <tr className='font-roboto font-bold'>
          <td>Topic</td>
          <td>Author</td>
          <td>Replies</td>
          <td>Last Post</td>
        </tr>
      </thead>
      <tbody>
        {filteredTopics.map(topic => (
          <TopicItem
            id={topic.id}
            name={topic.name}
            author={topic.author}
            replies={topic.replies}
            lastPost={topic.lastPost}
          />
        ))}
      </tbody>
    </table>
  )
}

function filterTopics(
  topics: TopicItemProps[],
  query: string | null,
  sort: string | null
): TopicItemProps[] {
  const validSortFields: Array<keyof TopicItemProps> = [
    'name',
    'author',
    'replies',
    'lastPost',
  ]

  // Check if sort is a valid field
  const sortField =
    sort !== null && validSortFields.includes(sort as keyof TopicItemProps)
      ? (sort as keyof TopicItemProps)
      : null

  // Step 1: Filter topics based on the search query
  const filteredBySearchTopics = query
    ? topics.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    : topics

  // Step 2: Sort the filtered topics if the sort field is specified, valid, and not 'all'
  if (sortField && validSortFields.includes(sortField)) {
    const sortedTopics = [...filteredBySearchTopics]

    return sortedTopics.sort((a, b) => {
      if (sortField === 'lastPost') {
        return new Date(a.lastPost).getTime() - new Date(b.lastPost).getTime()
      }

      const aValue = a[sortField]
      const bValue = b[sortField]

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue)
      }

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return aValue - bValue
      }

      return 0 // If types are mismatched or cannot be sorted
    })
  }

  // If no valid sort is specified, return the filtered topics without sorting
  return filteredBySearchTopics
}
