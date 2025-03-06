import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { FieldError } from 'react-hook-form'
import { InputHTMLAttributes } from 'react'

interface AppInputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  error?: FieldError
  register: UseFormRegister<T>
}

const AppInput = <T extends object>({
  register,
  name,
  label,
  error,
  ...props
}: AppInputProps<T>) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between text-[13px] items-center">
        <h1 className="w-[11rem] min-h-[1.5rem] leading-tight">{label}</h1>
        <input
          {...register(name as Path<T>)}
          className="w-[60%] border-b-2 border-gray-400 outline-none focus:border-black bg-[#D9D9D9] h-8"
          {...props}
        />
      </div>
      <div
        style={{ display: error ? 'block' : 'none' }}
        className="w-[28rem] text-[13px] max-h-[2rem] mt-1">
        <p className="text-red-500 text-[10px]">{`${error?.message}`}</p>
      </div>
    </div>
  )
}

export default AppInput
