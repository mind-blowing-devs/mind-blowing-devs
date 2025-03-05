import { memo } from 'react'

type AvatarProps = {
  avatar: string | null
}

export default memo(function Avatar({ avatar }: AvatarProps) {
  return (
    <div className="rounded-full bg-[#BFBFBF] w-36 h-36 flex items-center justify-center overflow-hidden">
      <img
        src={
          avatar
            ? `https://ya-praktikum.tech/api/v2/resources/${avatar}`
            : '/default-avatar.png'
        }
        alt="Player's avatar"
        className="w-full h-full object-cover"
      />
    </div>
  )
})
