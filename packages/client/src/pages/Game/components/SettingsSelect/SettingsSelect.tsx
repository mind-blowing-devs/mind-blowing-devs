import { FC } from 'react'

interface ISettingsSelect {
  label: string
  value: string
  options: string[]
  onChange: (value: string) => void
}

const SettingsSelect: FC<ISettingsSelect> = ({
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-2">
      <label className="flex-shrink-0 text-[#585656] min-w-[4rem]">
        {label}:
      </label>
      <div className="relative flex-1 min-w-0">
        <select
          className="w-full appearance-none bg-[#BFBFBF] px-5 py-1 pr-8 border-2 border-t-[#7B7B7B] border-l-[#7B7B7B] border-r-white border-b-white focus:outline-none"
          onChange={e => onChange(e.target.value)}
          value={value}>
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <span className="text-gray-700">▼</span>
        </div>
      </div>
    </div>
  )
}

export default SettingsSelect
