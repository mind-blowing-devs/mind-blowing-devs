import { memo } from 'react'
import { API_URL } from '../../../../api/baseAPI'

type AvatarProps = {
  avatar: string | null
}

export const RESOURCES_URL = API_URL + '/yandex/resources'
export const DEFAULT_AVATAR_URL = '/default-avatar.png'

export default memo(function Avatar({ avatar }: AvatarProps) {
  return (
    <div className="flex justify-center">
      <div className="rounded-full bg-[#BFBFBF] w-36 h-36 flex items-center justify-center overflow-hidden">
        <img
          src={avatar ? RESOURCES_URL + avatar : DEFAULT_AVATAR_URL}
          alt="Player's avatar"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  )
})
