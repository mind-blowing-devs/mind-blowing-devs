import { FieldValues, Path, UseFormRegister } from 'react-hook-form'
import { FieldError } from 'react-hook-form'
import { InputHTMLAttributes } from 'react'

interface AppInputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: FieldError
  register: UseFormRegister<T>
}

const AppInput = <T extends object>({
  register,
  label,
  error,
  ...props
}: AppInputProps<T>) => {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between text-[13px]">
        <h1>{label}</h1>
        <input
          {...register(label as Path<T>)}
          className="w-[60%] border-b-2 border-gray-400 outline-none focus:border-black bg-[#D9D9D9]"
          {...props}
        />
      </div>
      <div
        style={{ display: error ? 'block' : 'none' }}
        className="max-w-[22rem] text-[13px] mt-2">
        <p className="text-red-500">{`${error?.message}`}</p>
      </div>
    </div>
  )
}

export default AppInput
