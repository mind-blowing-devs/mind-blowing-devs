import React from 'react'

export interface IReply {
  id: string
  nickname: string
  text: string
  timestamp: string
  currentUserNickname: string
  onDeleteReply: (commentId: string) => Promise<void>
}

export default function Reply({
  id,
  nickname,
  text,
  timestamp,
  currentUserNickname,
  onDeleteReply,
}: IReply) {
  return (
    <div className="group">
      <div className="font-roboto font-normal mb-[12px] flex justify-between">
        <div>
          <span className="underline decoration-solid">{nickname}</span> •{' '}
          {timestamp}
        </div>
        {nickname === currentUserNickname && (
          <button
            className="opacity-0 group-hover:opacity-100 transition-opacity hover:text-gray-600"
            onClick={() => onDeleteReply(id)}>
            delete
          </button>
        )}
      </div>
      <span className="font-roboto">{text}</span>
    </div>
  )
}
