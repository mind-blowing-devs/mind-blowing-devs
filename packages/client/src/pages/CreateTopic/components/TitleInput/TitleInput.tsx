import type { FieldError, UseFormRegister } from 'react-hook-form'
import type { CreateTopicFormValues } from '../../CreateTopic'
import { sanitizeString } from '../../../../utils/sanitize'

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
          {...register('topicTitle', {
            validate: value => {
              const sanitized = sanitizeString(value)
              if (!sanitized) {
                return 'Title contains potentially dangerous content'
              }
              return true
            },
          })}
        />
        ]
      </span>
      {error && <p className="text-red-500 text-[10px]">{error.message}</p>}
    </div>
  )
}
