import { FieldError, UseFormRegister } from 'react-hook-form'
import { CreateTopicFormValues } from '../../CreateTopic'

type InputProps = {
  register: UseFormRegister<CreateTopicFormValues>
  error?: FieldError
}

export default function TitleInput({ register, error }: InputProps) {
  return (
    <div className="flex flex-col w-full gap-[12px] py-[15px]">
      <label className="font-roboto font-semibold" htmlFor="topicTitle">
        Topic Title
      </label>
      <span>
        [
        <input
          type="text"
          id="topicTitle"
          className="bg-transparent outline-none w-[180px] border-b-[1px] border-black border-dashed"
          {...register('topicTitle')}
        />
        ]
      </span>
      {error && <p className="text-red-500 text-[10px]">{error.message}</p>}
    </div>
  )
}
