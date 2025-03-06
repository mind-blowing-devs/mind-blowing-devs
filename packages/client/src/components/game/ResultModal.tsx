interface IResultModal {
  isOpen: boolean
  onClose: () => void
  result: 'won' | 'lost'
}

function ResultModal({ isOpen, onClose, result }: IResultModal) {
  if (!isOpen) return null

  const isWin = result === 'won'

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#BFBFBF] p-6 border-4 border-t-white border-l-white border-r-[#7B7B7B] border-b-[#7B7B7B] max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">
          {isWin
            ? 'Congratulations! The minefield is clear!'
            : 'Boom! You hit a mine!'}
        </h2>

        <div className="space-y-2 mb-6">
          <p>Time: 05.02</p>
          <p>Best time: 12.12</p>
          <p>Cells cleared: 45</p>
          <p>Mines remaining: {isWin ? '0' : '10'}</p>
          <p>Difficulty: Expert</p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#BFBFBF] px-4 py-2 border-2 border-t-white border-l-white border-r-[#7B7B7B] border-b-[#7B7B7B] active:border-t-[#7B7B7B] active:border-l-[#7B7B7B] active:border-r-white active:border-b-white">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultModal
