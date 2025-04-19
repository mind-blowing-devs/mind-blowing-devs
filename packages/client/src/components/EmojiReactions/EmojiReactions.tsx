import { useState, useCallback, useRef, useEffect } from 'react'
import { useEmojiReactions } from '../../hooks'
import { ALL_AVAILABLE_EMOJIS } from '../../api/reactionAPI'

interface IEmojiReactions {
  replyId: number
}

export default function EmojiReactions({ replyId }: IEmojiReactions) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  // Используем хук для работы с эмодзи-реакциями
  const { reactions, isLoading, addReaction, error } = useEmojiReactions({
    replyId,
  })

  // Функция для добавления реакции эмодзи
  const handleAddReaction = useCallback(
    async (emoji: string) => {
      await addReaction(emoji)
      setShowEmojiPicker(false)
    },
    [addReaction]
  )

  // Функция для отображения панели выбора эмодзи
  const toggleEmojiPicker = useCallback(() => {
    setShowEmojiPicker(prev => !prev)
  }, [])

  // Проверяем клик вне панели выбора эмодзи
  useEffect(() => {
    if (!showEmojiPicker) return

    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setShowEmojiPicker(false)
      }
    }

    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowEmojiPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscKey)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [showEmojiPicker])

  return (
    <div>
      {isLoading ? (
        <div className="font-roboto mt-2 text-sm text-gray-500">
          Loading reactions...
        </div>
      ) : error ? (
        <div className="font-roboto mt-2 text-sm text-red-500">
          Error loading reactions
        </div>
      ) : (
        reactions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {reactions.map(reaction => (
              <button
                key={reaction.id || `${reaction.emoji}-${reaction.count}`}
                className="flex items-center bg-gray-100 rounded-full px-2 py-1 text-sm hover:bg-gray-200"
                onClick={() => handleAddReaction(reaction.emoji)}
                aria-label={`React with ${reaction.emoji}`}>
                <span className="mr-1">{reaction.emoji}</span>
                <span>{reaction.count}</span>
              </button>
            ))}
          </div>
        )
      )}

      <div className="mt-2 relative">
        <button
          onClick={toggleEmojiPicker}
          className="font-roboto text-sm text-gray-500 hover:text-black"
          aria-label="Add reaction">
          [add reaction]
        </button>

        {showEmojiPicker && (
          <div
            ref={pickerRef}
            className="absolute mt-1 bg-white border border-gray-200 rounded-md shadow-md p-2 z-10">
            <div className="flex flex-wrap gap-2">
              {ALL_AVAILABLE_EMOJIS.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => handleAddReaction(emoji)}
                  className="text-xl hover:bg-gray-100 p-1 rounded-md cursor-pointer"
                  aria-label={`Add ${emoji} reaction`}>
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
