import { useState, FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

type Difficulty = RootState['gameState']['difficulty']
type Theme = 'classic' | 'dark'

interface ISettingsModal {
  isOpen: boolean
  onClose: () => void
  handleSave: (difficulty: Difficulty, theme: Theme) => void
}

const SettingsModal: FC<ISettingsModal> = ({ isOpen, onClose, handleSave }) => {
  if (!isOpen) return null

  const initialDifficulty = useSelector(
    (state: RootState) => state.gameState.difficulty
  )
  // TODO get initial theme state

  const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty)
  const [theme, setTheme] = useState<Theme>('classic')

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
                onChange={e => setTheme(e.target.value as Theme)}
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
          <button
            className="bg-[#BFBFBF] px-4 py-2 border-2 border-t-white border-l-white border-r-[#7B7B7B] border-b-[#7B7B7B] active:border-t-[#7B7B7B] active:border-l-[#7B7B7B] active:border-r-white active:border-b-white"
            onClick={handleLocalSave}>
            save
          </button>
          <button
            onClick={onClose}
            className="bg-[#BFBFBF] px-4 py-2 border-2 border-t-white border-l-white border-r-[#7B7B7B] border-b-[#7B7B7B] active:border-t-[#7B7B7B] active:border-l-[#7B7B7B] active:border-r-white active:border-b-white">
            close
          </button>
        </div>
      </div>
    </div>
  )
}

export default SettingsModal
