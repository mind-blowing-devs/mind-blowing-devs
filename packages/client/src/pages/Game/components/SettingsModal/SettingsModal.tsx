import { useState, FC } from 'react'
import {
  RootState,
  useAppDispatch,
  useAppSelector,
  setTheme,
  type Theme,
} from '../../../../store'

import { GameButton } from '../GameButton'
import { SettingsSelect } from '../SettingsSelect'

type Difficulty = RootState['gameState']['difficulty']

interface ISettingsModal {
  isOpen: boolean
  onClose: () => void
  handleSave: (difficulty: Difficulty, theme: Theme) => void
}

const SettingsModal: FC<ISettingsModal> = ({ isOpen, onClose, handleSave }) => {
  const initialDifficulty = useAppSelector(state => state.gameState.difficulty)

  const dispatch = useAppDispatch()
  const { theme } = useAppSelector(state => state.theme)
  const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty)

  if (!isOpen) return null

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
          <SettingsSelect
            label="mode"
            value={difficulty}
            options={['beginner', 'intermediate', 'expert']}
            onChange={value => setDifficulty(value as Difficulty)}
          />
          <SettingsSelect
            label="theme"
            value={theme}
            options={['classic', 'dark']}
            onChange={value => dispatch(setTheme(value as Theme))}
          />
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
