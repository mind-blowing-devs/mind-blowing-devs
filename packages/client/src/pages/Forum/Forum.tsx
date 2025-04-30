import { Link } from 'react-router-dom'
import { Filter, TopicsList, type TopicItemProps } from './components'
import { Helmet } from 'react-helmet'
import { usePage } from '../../hooks'
import { useEffect, useState } from 'react'
import { ForumTopicsInfo, getAllTopics } from '../../api/topicsAPI'

export default function Forum() {
  usePage({})

  const [topics, setTopics] = useState<TopicItemProps[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  const fetchTopics = async () => {
    setLoading(true)
    try {
      const response = await getAllTopics({ limit: 5, page })

      const apiTopics = response.data.topics
      const formattedTopics: TopicItemProps[] = apiTopics.map((topic: ForumTopicsInfo) => ({
        id: topic.id,
        name: topic.title,
        author: topic.author,
        replies: topic.commentCount,
        lastPost: topic.lastCommentAt ?? topic.createdAt,
      }))

      setTopics(formattedTopics)
      setTotalPages(response.data.pagination.totalPages || 1)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTopics()
  }, [page])

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-[50px]">
      <Helmet>
        <title>Forum / Minesweeper Adventure game</title>
        <meta
          name="description"
          content="Welcome to Forum! You can discuss any Topic regarding Mind-blowing_Devs or Minesweeper Adventure game!"
        />
      </Helmet>

      <h1 className="w-full mb-[5px] sm:mb-[13px] sm:text-xl text-font-color">Minesweeper Forum</h1>
      <h2 className="font-roboto font-sm w-full sm:text-base text-black lg:mb-[60px] sm:mb-[30px] mb-[10px]">
        Discuss strategies, share tips, and connect with other players!
      </h2>

      <div className="border-4 border-[#818181] bg-[#D9D9D9] flex flex-col justify-center items-center relative w-full lg:px-[32px] md:px-[15px] px-[10px] pb-[35px] text-xs md:text-base sm:text-sm overflow-y-auto">
        <Filter />
        {loading ? <p>Loading topics...</p> : <TopicsList topics={topics} />}
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
      </div>

      <nav className="flex flex-col items-center gap-[16px] my-5 sm:my-8">
        <Link
          to="/createtopic"
          className="font-press text-sm hover:text-gray-500 select-none"
          aria-label="New topic">
          [new topic]
        </Link>
        <button
          className="font-press text-sm hover:text-gray-500 select-none"
          onClick={() => {
            if (page === 1) fetchTopics()
            else setPage(1)
          }}>
          [refresh]
        </button>
        <Link
          to="/game"
          className="font-press text-sm text-green-700 hover:text-gray-500 select-none"
          aria-label="Back to Game">
          [back to game]
        </Link>
      </nav>
    </main>
  )
}
