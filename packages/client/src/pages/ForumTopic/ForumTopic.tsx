import { Link } from 'react-router-dom'
import React from 'react'
import CommentInput from './components/CommentInput'
import Reply from './components/Reply'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  comment: z.string().min(1, 'Reply is required'),
})

type FormValues = z.infer<typeof schema>

export default function ForumTopic() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormValues) => {
    console.log('Form data:', data)
    alert('Not implemented')
    reset()
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-[50px]">
      <h2 className="w-full mb-[5px] sm:mb-[13px] sm:text-xl text-font-color">
        Minesweeper Forum
      </h2>
      <span className="font-roboto font-sm w-full sm:text-base text-black lg:mb-[60px] sm:mb-[30px] mb-[10px]">
        Discuss strategies, share tips, and connect with other players!
      </span>

      <div className="border-4 border-[#818181] bg-[#D9D9D9] flex flex-col justify-center items-center relative w-full lg:px-[32px] md:px-[15px] px-[10px] text-xs md:text-base sm:text-sm overflow-y-auto">
        <h3 className="font-roboto font-semibold w-full my-[2px] sm:my-[4px] lg:my-[12px] text-lg lg:text-xl sm:text-lg text-black sm:text-center text-left">
          Бум или Бах?
        </h3>
        <span className="font-roboto w-full font-sm lg:text-base sm:text-sm sm:mb-[20px] mb-[8px] text-black sm:text-center text-left">
          Posted by: MineMaster • 2 days ago • Views: 142
        </span>
        <span className="font-roboto">
          Всем привет, сапёры! Давно хотел спросить у сообщества: как вы
          реагируете, когда случайно подрываетесь на мине? Кричите "Бум"? Или
          "Бах"? А может у вас есть своё негодование? Лично я всегда говорю
          "Бах!" и бросаю мышку (не рекомендую). Жена уже привыкла к моим
          внезапным возгласам во время игры :) А как у вас?
        </span>

        <section className="w-full">
          <h3 className="font-roboto font-semibold my-[30px]">Replies (2)</h3>
          <Reply
            nickname="SweeperPro"
            timestamp="5 days ago"
            text="Кстати, кто-нибудь замечал, что первый клик иногда всё равно приводит к взрыву? Или это только у меня такое?"
          />
          <Reply
            nickname="SweeperPro"
            timestamp="5 days ago"
            text="Кстати, кто-нибудь замечал, что первый клик иногда всё равно приводит к взрыву? Или это только у меня такое?"
          />
          <button className="font-roboto font-normal sm:text-base text-sm pt-[10px] hover:text-gray-500">
            [More replies...]
          </button>
        </section>

        <form
          className="w-full flex flex-col items-start"
          onSubmit={handleSubmit(onSubmit)}>
          <CommentInput register={register} error={errors.comment} />
          <button
            type="submit"
            className="font-roboto font-normal sm:text-base text-sm hover:text-gray-500 self-end">
            [submit reply]
          </button>
        </form>
      </div>

      <nav className="flex flex-col items-center gap-[16px] my-5 sm:my-8">
        <Link
          to="/createtopic"
          className="font-press text-sm hover:text-gray-500 select-none"
          aria-label="New topic">
          [create topic]
        </Link>

        <Link
          to="/forum"
          className="font-press text-sm hover:text-gray-500 select-none"
          aria-label="Back to forum">
          [cancel]
        </Link>

        <Link
          to="/forum"
          className="font-press text-sm text-green-700 hover:text-gray-500 select-none"
          aria-label="Back to forum">
          [back to forum]
        </Link>
      </nav>
    </main>
  )
}
