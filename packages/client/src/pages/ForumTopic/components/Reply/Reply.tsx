import { EmojiReactions } from '../../../../components/EmojiReactions'

export interface IReply {
  nickname: string
  text: string
  timestamp: string
  id?: number
}

export default function Reply({ nickname, text, timestamp, id = 0 }: IReply) {
  return (
    <div className="mb-4 pb-4 border-b border-gray-200">
      <div className="font-roboto font-normal mb-[12px]">
        <span className="underline decoration-solid">{nickname}</span> •{' '}
        {timestamp}
      </div>
      <span className="font-roboto">{text}</span>
      <EmojiReactions replyId={id} />
    </div>
  )
}
