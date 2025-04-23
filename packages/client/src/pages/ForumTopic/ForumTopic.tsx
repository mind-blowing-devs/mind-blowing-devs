import { Link, useParams } from 'react-router-dom'
import { CommentInput, Reply } from './components'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Helmet } from 'react-helmet'
import { usePage } from '../../hooks'
import { useCallback, useEffect, useState } from 'react'
import {
  CommentsType,
  createTopicReply,
  deleteTopicReply,
  ForumTopicDataType,
  getTopicDetailed,
} from '../../api/topicsAPI'
import { AppSpinner } from '../../components'
import { useAppSelector } from '../../store'
import { formatDate } from '../../utils'

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

  const [topic, setTopic] = useState<ForumTopicDataType | null>(null)
  const [comments, setComments] = useState<CommentsType[]>([])

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const { user } = useAppSelector(state => state.user)

  const { id } = useParams()

  usePage({})

  const commentsPerPage = 4

  const fetchData = useCallback(async () => {
    try {
      if (id) {
        const response = await getTopicDetailed(id)
        if (response.data) {
          setTopic(response.data)
          setComments(response.data.comments)
          setTotalPages(Math.ceil(response.data.commentCount / commentsPerPage))
        }
      }
    } catch (error) {
      console.log(error)
    }
  }, [id])

  useEffect(() => {
    fetchData()

    return () => {
      setTopic(null)
      setComments([])
    }
  }, [])

  const onSubmit = async (data: FormValues) => {
    if (user && id) {
      await createTopicReply({
        topicId: id,
        author: user.login,
        body: data.comment,
      })
      await fetchData()
      setPage(1)
    }
    reset()
  }

  const onDeleteReply = async (commentId: string) => {
    try {
      await deleteTopicReply(commentId).then(() => {
        const newComments = comments.filter(item => item.id !== commentId)
        setComments(newComments)
      })
    } catch (error) {
      console.log(error)
    }
  }

  const startIndex = (page - 1) * commentsPerPage
  const endIndex = startIndex + commentsPerPage
  const currentComments = comments.slice(startIndex, endIndex)

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-[50px]">
      <Helmet>
        <title>Topic / Minesweeper Adventure game</title>
        <meta name="description" content="Topic description" />
      </Helmet>
      <h1 className="w-full mb-[5px] sm:mb-[13px] sm:text-xl text-font-color">
        Minesweeper Forum
      </h1>
      <h2 className="font-roboto font-sm w-full sm:text-base text-black lg:mb-[60px] sm:mb-[30px] mb-[10px]">
        Discuss strategies, share tips, and connect with other players!
      </h2>

      {topic ? (
        <div className="border-4 border-[#818181] bg-[#D9D9D9] flex flex-col justify-center items-center relative w-full lg:px-[32px] md:px-[15px] px-[10px] text-xs md:text-base sm:text-sm overflow-y-auto">
          <h3 className="font-roboto font-semibold w-full my-[2px] sm:my-[4px] lg:my-[12px] text-lg lg:text-xl sm:text-lg text-black sm:text-center text-left">
            {topic.title}
          </h3>
          <h4 className="font-roboto w-full font-sm lg:text-base sm:text-sm sm:mb-[20px] mb-[8px] text-black sm:text-center text-left">
            {/* TODO: add Views functionality */}
            Posted by: {topic.author} • {formatDate(topic.createdAt)} • Views:
            142
          </h4>
          <p className="font-roboto">{topic.description}</p>

          <section className="w-full">
            <h3 className="font-roboto font-semibold my-[30px]">
              Replies ({comments.length})
            </h3>

            {currentComments.map(comment => (
              <Reply
                id={comment.id}
                nickname={comment.author}
                timestamp={comment.createdAt}
                text={comment.body}
                currentUserNickname={user?.login ?? ''}
                onDeleteReply={onDeleteReply}
              />
            ))}

            {comments.length > 5 && (
              <div className="flex gap-2 mt-4">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(prev => prev - 1)}
                  className="px-2 py-1 disabled:opacity-50">
                  ← Prev
                </button>
                <span className="flex items-center">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(prev => prev + 1)}
                  className="px-2 py-1 disabled:opacity-50">
                  Next →
                </button>
              </div>
            )}
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
      ) : (
        <AppSpinner />
      )}

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
