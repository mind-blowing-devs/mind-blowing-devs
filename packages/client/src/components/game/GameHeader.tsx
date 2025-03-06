import Counter from './Counter'
import ResetButton from './ResetButton'
import SettingsButton from './SettingsButton'
import FullScreenButton from './FullScreenButton'

interface IGameHeader {
  minesLeft: number
  time: number
  onReset: () => void
  onOpenSettings: () => void
  onFullScreen: () => void
  gameStatus: 'playing' | 'won' | 'lost'
}

export default function GameHeader({
  minesLeft,
  time,
  onReset,
  gameStatus,
  onOpenSettings,
  onFullScreen,
}: IGameHeader) {
  return (
    <div className="flex justify-between items-center px-4 py-2 border-4 border-t-[#7B7B7B] border-l-[#7B7B7B] border-r-white border-b-white bg-[#BFBFBF] mb-2">
      <Counter value={minesLeft} />
      <FullScreenButton onClick={onFullScreen} />
      <ResetButton status={gameStatus} onClick={onReset} />
      <SettingsButton onClick={onOpenSettings} />
      <Counter value={time} />
    </div>
  )
}
