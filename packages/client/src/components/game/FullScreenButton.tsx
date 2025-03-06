import { ArrowsPointingOutIcon } from '@heroicons/react/24/solid'

interface IFullScreenButton {
  onClick: () => void
}

export default function FullScreenButton({ onClick }: IFullScreenButton) {
  return (
    <button
      onClick={onClick}
      className="bg-[#BFBFBF] w-[40px] h-[40px] flex items-center justify-center text-2xl hover:bg-[#d4d4d4] border-2 border-t-white border-l-white border-r-[#7B7B7B] border-b-[#7B7B7B] active:border-t-[#7B7B7B] active:border-l-[#7B7B7B] active:border-r-white active:border-b-white"
      aria-label="Полноэкранный режим">
      <ArrowsPointingOutIcon className="w-6 h-6 text-black" />
    </button>
  )
}
