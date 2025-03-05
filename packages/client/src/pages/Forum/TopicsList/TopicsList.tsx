import TopicItem from './TopicItem'
import type { TopicItemProps } from './TopicItem'

interface TopicsListProps {
  topics: TopicItemProps[]
}

export default function TopicsList({ topics }: TopicsListProps) {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <td>Topic</td>
          <td>Author</td>
          <td>Replies</td>
          <td>Last Post</td>
        </tr>
      </thead>
      <tbody>
        {topics.map(topic => (
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
