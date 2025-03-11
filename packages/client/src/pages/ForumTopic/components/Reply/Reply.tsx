import React from 'react'

export interface IReply {
  nickname: string
  text: string
  timestamp: string
}

export default function Reply({ nickname, text, timestamp }: IReply) {
  return (
    <div>
      <div className="font-roboto font-normal mb-[12px]">
        <span className="underline decoration-solid">{nickname}</span> •{' '}
        {timestamp}
      </div>
      <span>{text}</span>
    </div>
  )
}
