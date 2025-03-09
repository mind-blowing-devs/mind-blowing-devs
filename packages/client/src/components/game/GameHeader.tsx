import Counter from './Counter'
import GameButton from './GameButton'

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
      <div className="flex items-center gap-8">
        <GameButton variant="fullscreen" onClick={onFullScreen} />
        <GameButton variant="reset" onClick={onReset} gameStatus={gameStatus} />
        <GameButton variant="settings" onClick={onOpenSettings} />
      </div>
      <Counter value={time} />
    </div>
  )
}
