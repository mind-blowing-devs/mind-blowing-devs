interface IResetButton {
  status: 'playing' | 'won' | 'lost'
  onClick: () => void
}

export default function ResetButton({ status, onClick }: IResetButton) {
  const getEmoji = () => {
    switch (status) {
      case 'playing':
        return '🙂'
      case 'won':
        return '😎'
      case 'lost':
        return '😵'
    }
  }

  return (
    <button
      onClick={onClick}
      className="bg-[#BFBFBF] w-[40px] h-[40px] flex items-center justify-center text-2xl hover:bg-[#d4d4d4] border-2 border-t-white border-l-white border-r-[#7B7B7B] border-b-[#7B7B7B] active:border-t-[#7B7B7B] active:border-l-[#7B7B7B] active:border-r-white active:border-b-white">
      {getEmoji()}
    </button>
  )
}
