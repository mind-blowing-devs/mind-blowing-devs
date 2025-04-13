import { Link } from 'react-router-dom'
import { TitleInput, DescriptionInput, CategoryInput } from './components'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet'

const schema = z.object({
  topicTitle: z
    .string()
    .min(1, 'Topic Title is required')
    .max(125, 'Topic Title must be 125 characters or less'),
  topicCategory: z.string().optional(),
  topicDescription: z
    .string()
    .min(1, 'Topic Description is required')
    .max(600, 'Topic Description must be 600 characters or less'),
})

export type CreateTopicFormValues = z.infer<typeof schema>

export default function CreateTopic() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: CreateTopicFormValues) => {
    alert('Not implemented')
    reset()
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-[50px]">
      <Helmet>
        <title>Create a Topic / Forum</title>
        <meta
          name="description"
          content="Create any Topic regarding Mind-blowing_Devs or Minesweeper Adventure game!"
        />
      </Helmet>
      <h1 className="w-full mb-[5px] sm:mb-[13px] sm:text-xl text-[#585656]">
        Minesweeper Forum
      </h1>
      <h2 className="font-roboto font-sm w-full sm:text-base text-black lg:mb-[60px] sm:mb-[30px] mb-[10px]">
        Discuss strategies, share tips, and connect with other players!
      </h2>

      <div className="border-4 border-[#818181] bg-[#D9D9D9] flex flex-col justify-center items-center relative w-full lg:px-[32px] md:px-[15px] px-[10px] text-xs md:text-base sm:text-sm overflow-y-auto">
        <h3 className="font-roboto font-semibold w-full my-[2px] sm:my-[4px] lg:my-[12px] text-lg lg:text-xl sm:text-lg text-black sm:text-center text-left">
          Create New Topic
        </h3>
        <p className="font-roboto w-full font-sm lg:text-lg sm:text-sm sm:mb-[10px] mb-[5px] text-black sm:text-center text-left">
          Share your thoughts, ask questions or start a discussion!
        </p>

        <form
          className="w-full flex flex-col items-start mb-[10px]"
          onSubmit={handleSubmit(onSubmit)}>
          <TitleInput register={register} error={errors.topicTitle} />
          <CategoryInput register={register} />
          <DescriptionInput
            register={register}
            error={errors.topicDescription}
          />
        </form>
      </div>

      <nav className="flex flex-col items-center gap-[16px] my-5 sm:my-8">
        {/* TODO: fetch fresh data */}
        <button
          className="font-press text-sm hover:text-gray-500 select-none"
          onClick={handleSubmit(onSubmit)}>
          [create topic]
        </button>

        <Link
          to="/forum"
          className="font-press text-sm hover:text-gray-500 select-none"
          aria-label="Back to Forum">
          [cancel]
        </Link>

        <Link
          to="/forum"
          className="font-press text-sm text-green-700 hover:text-gray-500 select-none"
          aria-label="Back to Forum">
          [back to forum]
        </Link>
      </nav>
    </main>
  )
}
