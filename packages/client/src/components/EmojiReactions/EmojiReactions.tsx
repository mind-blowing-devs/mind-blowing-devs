import { useState, useCallback } from 'react'
import { useEmojiReactions } from '../../hooks'
import EmojiPicker from './EmojiPicker'

interface IEmojiReactions {
  replyId: number
}

export default function EmojiReactions({ replyId }: IEmojiReactions) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

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

  // Функция для закрытия панели эмодзи
  const closeEmojiPicker = useCallback(() => {
    setShowEmojiPicker(false)
  }, [])

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
                <span className="mr-1 text-xl">{reaction.emoji}</span>
                <span className="text-xs text-gray-600">{reaction.count}</span>
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
          <EmojiPicker
            onSelect={handleAddReaction}
            onClose={closeEmojiPicker}
          />
        )}
      </div>
    </div>
  )
}
