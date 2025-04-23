import { Link } from 'react-router-dom'
import { formatDate } from '../../../../utils'

export interface TopicItemProps {
  id: string
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
    /*
      Never put Link component inside <tr> tag
      Browser will ignore any Link's click events
    */
    <Link
      to={`/forumtopic/${id}`}
      aria-label={`Open ${name}`}
      className="contents">
      <tr className="font-roboto font-sm border-b-[1px] border-b-[#585656] cursor-pointer hover:text-gray-500">
        <td className="py-[12px] w-50">{name}</td>
        <td className={`py-[12px] ${author === 'You' ? 'text-green-700' : ''}`}>
          {author}
        </td>
        <td className="py-[12px]">{replies}</td>
        <td className="py-[12px]">{formatDate(lastPost)}</td>
      </tr>
    </Link>
  )
}
