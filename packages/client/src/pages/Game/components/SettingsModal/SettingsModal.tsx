import { useState, FC } from 'react'
import {
  RootState,
  useAppDispatch,
  useAppSelector,
  setSelectedThemeId,
} from '../../../../store'

import { GameButton } from '../GameButton'
import { SettingsSelect } from '../SettingsSelect'
import { saveUserTheme } from '../../../../api/themeAPI'

type Difficulty = RootState['gameState']['difficulty']

interface ISettingsModal {
  isOpen: boolean
  onClose: () => void
  handleSave: (difficulty: Difficulty) => void
}

const SettingsModal: FC<ISettingsModal> = ({ isOpen, onClose, handleSave }) => {
  const initialDifficulty = useAppSelector(state => state.gameState.difficulty)
  const { themes, selectedThemeId } = useAppSelector(state => state.theme)
  const { user } = useAppSelector(state => state.user)

  const dispatch = useAppDispatch()

  const [difficulty, setDifficulty] = useState<Difficulty>(initialDifficulty)

  if (!isOpen) return null

  const handleLocalSave = async () => {
    handleSave(difficulty)

    if (user?.id)
      try {
        await saveUserTheme(user.id, selectedThemeId ?? '')
      } catch (error) {
        console.log(error)
      }

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
          {themes.length > 0 && (
            <SettingsSelect
              label="theme"
              value={
                themes.find(item => item.id === selectedThemeId)?.name as string
              }
              options={themes.map(theme => theme.name)}
              onChange={value => dispatch(setSelectedThemeId(value))}
            />
          )}
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
