import { FC } from 'react'
import { DigitDisplay } from '../DigitDisplay'

interface ICounter {
  value: number
}

const Counter: FC<ICounter> = ({ value }) => {
  // Форматируем число до 3 цифр с ведущими нулями
  const formattedValue = value.toString().padStart(3, '0')

  return (
    <div className="bg-black border border-[#7B7B7B] w-[64px] h-[32px] flex items-center justify-center gap-1">
      {formattedValue.split('').map((digit, index) => (
        <DigitDisplay key={index} digit={digit} />
      ))}
    </div>
  )
}

export default Counter
