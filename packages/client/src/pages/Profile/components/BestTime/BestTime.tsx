import { formatTime } from '../../../../utils'

type BestTimeProps = {
  time: number | undefined
}

export default function BestTime({ time }: BestTimeProps) {
  if (time === undefined) {
    return <dd className="text-[#585656]">-</dd>
  }

  return <dd className="text-[#0E7A11]">{formatTime(time)}</dd>
}
