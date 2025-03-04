import { memo } from "react"
import { getFilePath } from "../../utils/getFilePath"

type AvatarProps = {
  avatar: string | null
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  editable?: boolean
  onClick?: () => void
}

const sizeClasses = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-12 h-12 text-base',
  lg: 'w-16 h-16 text-lg',
  xl: 'w-28 h-28 text-3xl',
}

export default memo(function Avatar({
  avatar,
  name,
  size = 'sm',
  editable = false,
  onClick,
}: AvatarProps) {

  const content = avatar ? (
    <img src={getFilePath(avatar)} alt={name} className="w-full h-full object-cover" />
  ) : (
    <span className="text-gray-700 font-bold">
      {name
        .split(' ')
        .map(word => word[0])
        .slice(0, 2)
        .join('')
        .toUpperCase()}
    </span>
  )

  if (editable) {
    return (
      <button
        type="button"
        className={`relative rounded-full bg-gray-300 flex items-center justify-center overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 ${sizeClasses[size]}`}
        onClick={onClick}
        aria-label="Изменить аватар">
        {content}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <span className="text-white text-xs font-semibold">
            Изменить аватар
          </span>
        </div>
      </button>
    )
  }

  return (
    <div
      className='rounded-full bg-[#BFBFBF] w-36 h-36 flex items-center justify-center overflow-hidden'>
      {content}
    </div>
  )
}
)