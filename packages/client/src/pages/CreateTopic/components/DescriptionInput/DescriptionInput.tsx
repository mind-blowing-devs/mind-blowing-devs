import type { FieldError, UseFormRegister } from 'react-hook-form'
import type { CreateTopicFormValues } from '../../CreateTopic'

type InputProps = {
  register: UseFormRegister<CreateTopicFormValues>
  error?: FieldError
}

export default function DescriptionInput({ register, error }: InputProps) {
  return (
    <div className="flex flex-col w-full gap-[12px] py-[15px]">
      <label className="font-roboto font-semibold" htmlFor="topicDescription">
        Topic Description
      </label>
      <textarea
        className="w-full h-auto lg:min-h-[130px] min-h-[80px] max-h-[192px] border-2 border-[#818181] bg-[#D9D9D9] outline-none"
        id="topicDescription"
        {...register('topicDescription')}
      />
      {error && <p className="text-red-500 text-[10px]">{error.message}</p>}
    </div>
  )
}
