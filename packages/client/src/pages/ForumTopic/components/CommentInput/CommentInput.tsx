import { UseFormRegister } from 'react-hook-form'
import { sanitizeString } from '../../../../utils/sanitize'

interface CommentInputProps {
  register: UseFormRegister<{ comment: string }>
  error?: { message?: string }
}

export default function CommentInput({ register, error }: CommentInputProps) {
  return (
    <div className="flex flex-col w-full gap-[12px] py-[15px]">
      <label className="font-roboto font-semibold" htmlFor="comment">
        Your Reply
      </label>
      <textarea
        {...register('comment', {
          validate: value => {
            const sanitized = sanitizeString(value)
            if (!sanitized) {
              return 'Comment contains potentially dangerous content'
            }
            return true
          },
        })}
        className="font-roboto w-full h-auto lg:min-h-[130px] min-h-[80px] max-h-[192px] border-2 border-[#818181] bg-[#D9D9D9] outline-none p-[16px]"
        placeholder="Write your reply..."
        id="comment"
      />
      {error && <span className="text-red-500 text-[10px]">{error.message}</span>}
    </div>
  )
}
