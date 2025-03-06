interface ISettingsModal {
  onClose: () => void
}

function SettingsModal({ onClose }: ISettingsModal) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-[#BFBFBF] p-4 border-4 border-t-white border-l-white border-r-[#7B7B7B] border-b-[#7B7B7B]">
        <h2 className="text-xl mb-4">Настройки</h2>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-[#BFBFBF] border-2 border-t-white border-l-white border-r-[#7B7B7B] border-b-[#7B7B7B] active:border-t-[#7B7B7B] active:border-l-[#7B7B7B] active:border-r-white active:border-b-white">
          Закрыть
        </button>
      </div>
    </div>
  )
}

export default SettingsModal
