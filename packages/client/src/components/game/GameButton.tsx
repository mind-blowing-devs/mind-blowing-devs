import { ReactNode } from 'react'
import { Cog6ToothIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/solid'

type ButtonVariant = 'reset' | 'settings' | 'fullscreen' | 'custom'
type GameStatus = 'playing' | 'won' | 'lost'

interface IGameButton {
  ariaLabel?: string
  children?: ReactNode
  className?: string
  gameStatus?: GameStatus
  onClick: () => void
  variant?: ButtonVariant
}

function GameButton({
  ariaLabel,
  children,
  className = '',
  gameStatus = 'playing',
  onClick,
  variant = 'custom',
}: IGameButton) {
  // Базовые стили для всех кнопок
  const baseStyles = `
    bg-[#BFBFBF] 
    w-[40px] h-[40px] 
    flex items-center justify-center 
    text-2xl 
    hover:bg-[#d4d4d4] 
    border-2 
    border-t-white border-l-white 
    border-r-[#7B7B7B] border-b-[#7B7B7B] 
    active:border-t-[#7B7B7B] active:border-l-[#7B7B7B] 
    active:border-r-white active:border-b-white
  `

  // Определяем содержимое кнопки
  let content
  let buttonAriaLabel = ariaLabel

  // Простые условия для определения содержимого и aria-label
  if (variant === 'reset') {
    // Эмодзи для кнопки сброса
    if (gameStatus === 'playing') content = '🙂'
    else if (gameStatus === 'won') content = '😎'
    else if (gameStatus === 'lost') content = '😵'

    buttonAriaLabel = buttonAriaLabel || 'Сбросить игру'
  } else if (variant === 'settings') {
    content = <Cog6ToothIcon className="w-6 h-6 text-black" />
    buttonAriaLabel = buttonAriaLabel || 'Настройки'
  } else if (variant === 'fullscreen') {
    content = <ArrowsPointingOutIcon className="w-6 h-6 text-black" />
    buttonAriaLabel = buttonAriaLabel || 'Полноэкранный режим'
  } else {
    // Для custom варианта используем переданные children
    content = children
    buttonAriaLabel = buttonAriaLabel || 'Кнопка'
  }

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${className}`}
      aria-label={buttonAriaLabel}>
      {content}
    </button>
  )
}

export default GameButton
