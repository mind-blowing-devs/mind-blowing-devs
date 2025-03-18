import { useState, FC } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../../store/store'
import { setTheme, type Theme } from '../../store/themeSlice'
import GameButton from './GameButton'

type Difficulty = RootState['gameState']['difficulty']

interface ISettingsModal {
  isOpen: boolean
  onClose: () => void
  handleSave: (difficulty: Difficulty, theme: Theme) => void
}

const SettingsModal: FC<ISettingsModal> = ({ isOpen, onClose, handleSave }) => {
  if (!isOpen) return null

  const initialDifficulty = useAppSelector(state => state.gameState.difficulty)

  const dispatch = useAppDispatch()
  const { theme } = useAppSelector(state => state.theme)
  const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty)

  const handleLocalSave = () => {
    handleSave(difficulty, theme)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#BFBFBF] p-6 border-4 border-t-white border-l-white border-r-[#7B7B7B] border-b-[#7B7B7B] max-w-md w-full">
        <h2 className="text-xl font-bold mb-6 text-[#585656] select-none">
          settings
        </h2>

        <div className="space-y-4 mb-6">
          {/* Выбор режима сложности */}
          <div className="flex items-center">
            <label className="w-20 text-[#585656]">mode:</label>
            <div className="relative flex-1">
              <select
                className="w-full appearance-none bg-[#BFBFBF] px-5 py-1 pr-8 border-2 border-t-[#7B7B7B] border-l-[#7B7B7B] border-r-white border-b-white focus:outline-none"
                onChange={e => setDifficulty(e.target.value as Difficulty)}
                value={difficulty}>
                <option>beginner</option>
                <option>intermediate</option>
                <option>expert</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <span className="text-gray-700">▼</span>
              </div>
            </div>
          </div>

          {/* Выбор темы */}
          <div className="flex items-center">
            <label className="w-30 text-[#585656]">theme:</label>
            <div className="relative flex-1">
              <select
                className="w-full appearance-none bg-[#BFBFBF] px-5 py-1 pr-8 border-2 border-t-[#7B7B7B] border-l-[#7B7B7B] border-r-white border-b-white focus:outline-none"
                onChange={e => dispatch(setTheme(e.target.value as Theme))}
                value={theme}>
                <option>classic</option>
                <option>dark</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <span className="text-gray-700">▼</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <GameButton variant="default" onClick={handleLocalSave}>
            save
          </GameButton>
          <GameButton variant="default" onClick={onClose}>
            close
          </GameButton>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal
