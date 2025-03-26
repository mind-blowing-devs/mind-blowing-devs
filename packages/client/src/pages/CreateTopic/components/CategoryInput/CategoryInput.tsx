import type { UseFormRegister } from 'react-hook-form'
import type { CreateTopicFormValues } from '../../CreateTopic'

export default function CategoryInput({
  register,
}: {
  register: UseFormRegister<CreateTopicFormValues>
}) {
  return (
    <div className="flex flex-col w-full gap-[12px] py-[15px]">
      <label className="font-roboto font-semibold" htmlFor="topicCategory">
        Category (optional)
      </label>
      <span>
        [
        <select
          className="font-roboto bg-transparent outline-none w-[120px]"
          id="topicCategory"
          {...register('topicCategory')}>
          <option value="any">Any Category</option>
          <option value="strategies">Strategies</option>
          <option value="leaderboard">Leaderboard</option>
          <option value="developers">Developers</option>
          <option value="features">Features</option>
        </select>
        ]
      </span>
    </div>
  )
}
