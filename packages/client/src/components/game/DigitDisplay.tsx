import { FC } from 'react'

interface IDigitDisplay {
  digit: string
}

// Определяем, какие сегменты должны быть активны для каждой цифры
const segments = {
  '0': [true, true, true, false, true, true, true],
  '1': [false, false, true, false, false, true, false],
  '2': [true, false, true, true, true, false, true],
  '3': [true, false, true, true, false, true, true],
  '4': [false, true, true, true, false, true, false],
  '5': [true, true, false, true, false, true, true],
  '6': [true, true, false, true, true, true, true],
  '7': [true, false, true, false, false, true, false],
  '8': [true, true, true, true, true, true, true],
  '9': [true, true, true, true, false, true, true],
}

const DigitDisplay: FC<IDigitDisplay> = ({ digit }) => {
  const activeSegments =
    segments[digit as keyof typeof segments] || segments['0']

  return (
    <svg width="14" height="23" viewBox="0 0 14 23">
      {/* Горизонтальные сегменты */}
      {/* Верхний (a) */}
      <rect
        x="3"
        y="1"
        width="8"
        height="2"
        fill={activeSegments[0] ? '#FF0000' : '#300000'}
      />
      {/* Средний (d) */}
      <rect
        x="3"
        y="10"
        width="8"
        height="2"
        fill={activeSegments[3] ? '#FF0000' : '#300000'}
      />
      {/* Нижний (g) */}
      <rect
        x="3"
        y="19"
        width="8"
        height="2"
        fill={activeSegments[6] ? '#FF0000' : '#300000'}
      />

      {/* Вертикальные сегменты */}
      {/* Верхний левый (b) */}
      <rect
        x="1"
        y="3"
        width="2"
        height="7"
        fill={activeSegments[1] ? '#FF0000' : '#300000'}
      />
      {/* Верхний правый (c) */}
      <rect
        x="11"
        y="3"
        width="2"
        height="7"
        fill={activeSegments[2] ? '#FF0000' : '#300000'}
      />
      {/* Нижний левый (e) */}
      <rect
        x="1"
        y="12"
        width="2"
        height="7"
        fill={activeSegments[4] ? '#FF0000' : '#300000'}
      />
      {/* Нижний правый (f) */}
      <rect
        x="11"
        y="12"
        width="2"
        height="7"
        fill={activeSegments[5] ? '#FF0000' : '#300000'}
      />
    </svg>
  )
}

export default DigitDisplay
