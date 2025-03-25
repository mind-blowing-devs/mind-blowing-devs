import { FC } from 'react'

interface IDigitDisplay {
  digit: string
}

// Матрица сегментов для цифр 0-9
const segments = [
  [true, true, true, false, true, true, true], // 0
  [false, false, true, false, false, true, false], // 1
  [true, false, true, true, true, false, true], // 2
  [true, false, true, true, false, true, true], // 3
  [false, true, true, true, false, true, false], // 4
  [true, true, false, true, false, true, true], // 5
  [true, true, false, true, true, true, true], // 6
  [true, false, true, false, false, true, false], // 7
  [true, true, true, true, true, true, true], // 8
  [true, true, true, true, false, true, true], // 9
]

const DigitDisplay: FC<IDigitDisplay> = ({ digit }) => {
  const digitIndex = parseInt(digit, 10)
  const activeSegments = segments[digitIndex] || segments[0]

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
