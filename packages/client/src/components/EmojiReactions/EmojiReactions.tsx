import { useState, useCallback } from 'react'
import { useEmojiReactions } from '../../hooks'
import EmojiPicker from './EmojiPicker'

interface IEmojiReactions {
  replyId: string | number
}

export default function EmojiReactions({ replyId }: IEmojiReactions) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  // Преобразуем replyId в строку для хука
  const replyIdStr = typeof replyId === 'number' ? String(replyId) : replyId

  // Используем хук для работы с эмодзи-реакциями
  const { reactions, isLoading, addReaction, removeReaction, error } = useEmojiReactions({
    replyId: replyIdStr,
  })

  // Функция для добавления/удаления реакции эмодзи
  const handleReactionClick = useCallback(
    async (emoji: string, reactionId?: number) => {
      if (reactionId && reactionId > 0) {
        // Если это реакция текущего пользователя, удаляем её
        await removeReaction(reactionId)
      } else {
        // Добавляем новую реакцию
        await addReaction(emoji)
      }
      setShowEmojiPicker(false)
    },
    [addReaction, removeReaction]
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
        <div className="font-roboto mt-2 text-sm text-gray-500">Loading reactions...</div>
      ) : error ? (
        <div className="font-roboto mt-2 text-sm text-red-500">Error loading reactions</div>
      ) : (
        reactions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {reactions.map(reaction => (
              <button
                key={reaction.id || `${reaction.emoji}-${reaction.count}`}
                className={`flex items-center rounded-full px-2 py-1 text-sm 
                  ${
                    reaction.userReacted
                      ? 'bg-blue-100 hover:bg-blue-200'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                onClick={() =>
                  handleReactionClick(
                    reaction.emoji,
                    reaction.userReacted ? reaction.id : undefined
                  )
                }
                aria-label={
                  reaction.userReacted
                    ? `Remove ${reaction.emoji} reaction`
                    : `React with ${reaction.emoji}`
                }>
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
          <EmojiPicker onSelect={handleReactionClick} onClose={closeEmojiPicker} />
        )}
      </div>
    </div>
  )
}
