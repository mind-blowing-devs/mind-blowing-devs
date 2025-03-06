interface ICounter {
  value: number
}

export default function Counter({ value }: ICounter) {
  // Форматируем число до 3 цифр с ведущими нулями
  const formattedValue = value.toString().padStart(3, '0')

  return (
    <div className="bg-black text-[#FF0000] font-mono font-bold text-xl px-1 py-0.5 border border-[#7B7B7B] w-[54px] h-[32px] flex items-center justify-center">
      {formattedValue}
    </div>
  )
}
