import { Link } from 'react-router-dom'

export interface TopicItemProps {
  id: number
  name: string
  author: string
  replies: number
  lastPost: string
}

export default function TopicItem({
  id,
  name,
  author,
  replies,
  lastPost,
}: TopicItemProps) {
  return (
    <tr className="font-roboto font-sm border-b-[1px] border-b-[#585656] cursor-pointer hover:text-gray-500">
      <td className="py-[12px] w-50">
        <Link to={`forumtopic/${id}`} aria-label={`Open ${name}`}>
          {name}
        </Link>
      </td>
      <td className={`py-[12px] ${author === 'You' ? 'text-green-700' : ''}`}>
        {author}
      </td>
      <td className="py-[12px]">{replies}</td>
      <td className="py-[12px]">{lastPost}</td>
    </tr>
  )
}
