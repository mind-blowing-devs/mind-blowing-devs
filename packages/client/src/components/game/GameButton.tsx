import { Cog6ToothIcon, ArrowsPointingOutIcon } from '@heroicons/react/24/solid'

type ButtonVariant = 'reset' | 'settings' | 'fullscreen'
type GameStatus = 'playing' | 'won' | 'lost'

interface IGameButton {
  ariaLabel?: string
  className?: string
  gameStatus?: GameStatus
  onClick: () => void
  variant: ButtonVariant
}

function GameButton({
  ariaLabel,
  className = '',
  gameStatus = 'playing',
  onClick,
  variant,
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

  // Определяем содержимое и aria-label в зависимости от варианта
  if (variant === 'reset') {
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
