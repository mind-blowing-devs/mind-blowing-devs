import { FC } from 'react'
import { Cog6ToothIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/solid'

type ButtonVariant = 'reset' | 'settings' | 'fullscreen' | 'default'
type GameStatus = 'playing' | 'won' | 'lost' | 'idle'

interface IGameButton {
  ariaLabel?: string
  className?: string
  gameStatus?: GameStatus
  onClick: () => void
  variant: ButtonVariant
  children?: React.ReactNode
}

const GameButton: FC<IGameButton> = ({
  ariaLabel,
  className = '',
  gameStatus = 'idle',
  onClick,
  variant,
  children,
}) => {
  const baseStyles = `
    bg-[#BFBFBF] 
    flex items-center justify-center  
    hover:bg-[#d4d4d4] 
    border-2 
    border-t-white border-l-white 
    border-r-[#7B7B7B] border-b-[#7B7B7B] 
    active:border-t-[#7B7B7B] active:border-l-[#7B7B7B] 
    active:border-r-white active:border-b-white
  `

  const sizeStyles =
    variant === 'default' ? 'px-4 py-2' : 'w-[40px] h-[40px] text-2xl'

  const getEmojiContent = (gameStatus: GameStatus) => {
    const emojis = {
      playing: '🙂',
      won: '😎',
      lost: '😵',
      idle: '▶',
    }
    // Дискуссионный момент. Изначально привязался к смайликам, но у них специфическое поведение в браузере.
    // Чтобы отцентрировать их, пришлось использовать -mt-1
    return <span className="block -mt-1">{emojis[gameStatus]}</span>
  }

  // Определяем содержимое кнопки
  let content
  let buttonAriaLabel = ariaLabel

  // Определяем содержимое и aria-label в зависимости от варианта
  if (variant === 'reset') {
    content = getEmojiContent(gameStatus)
    buttonAriaLabel = buttonAriaLabel || 'reset game'
  } else if (variant === 'settings') {
    content = <Cog6ToothIcon className="w-6 h-6 text-black" />
    buttonAriaLabel = buttonAriaLabel || 'settings'
  } else if (variant === 'fullscreen') {
    content = <ArrowsPointingOutIcon className="w-6 h-6 text-black" />
    buttonAriaLabel = buttonAriaLabel || 'fullscreen mode'
  } else if (variant === 'default') {
    content = children
    buttonAriaLabel = buttonAriaLabel || 'button'
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles} ${className}`}
      aria-label={buttonAriaLabel}>
      {content}
    </button>
  )
}

export default GameButton
