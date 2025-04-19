import { useRef, useEffect } from 'react'
import { ALL_AVAILABLE_EMOJIS } from '../../api/reactionAPI'

interface EmojiPickerProps {
  onSelect: (emoji: string) => void
  onClose: () => void
}

export default function EmojiPicker({ onSelect, onClose }: EmojiPickerProps) {
  const pickerRef = useRef<HTMLDivElement>(null)

  // Закрытие пикера при клике вне элемента
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        onClose()
      }
    }

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscKey)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [onClose])

  return (
    <div
      ref={pickerRef}
      className="absolute mt-1 bg-white border border-gray-200 rounded-md shadow-md p-2 z-10">
      <div className="flex flex-wrap gap-2">
        {ALL_AVAILABLE_EMOJIS.map(emoji => (
          <button
            key={emoji}
            onClick={() => onSelect(emoji)}
            className="text-xl hover:bg-gray-100 p-1 rounded-md cursor-pointer"
            aria-label={`Add ${emoji} reaction`}>
            {emoji}
          </button>
        ))}
      </div>
    </div>
  )
}
