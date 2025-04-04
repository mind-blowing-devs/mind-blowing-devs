import type { UserAchievements } from '../../../../store'
import { Star } from '../Star'
import { BestTime } from '../BestTime'

type ProfileDetailsProps = {
  username: string
  userAchievements: UserAchievements
}

function calculatePlayerRating(gamesPlayed: number, gamesWon: number): number {
  if (gamesPlayed <= 0 || gamesWon < 0 || gamesWon > gamesPlayed) {
    return 0
  }

  const winRate = gamesWon / gamesPlayed
  const rating = winRate * 5

  return Math.round(Math.min(5, Math.max(0, rating)))
}

export default function ProfileDetails({
  username,
  userAchievements,
}: ProfileDetailsProps) {
  const { gamesPlayed, gamesWon, beginnerTime, intermediateTime, expertTime } =
    userAchievements
  const rating = calculatePlayerRating(gamesPlayed, gamesWon)
  return (
    <dl className="space-y-4">
      <div className="flex justify-between">
        <dt className="text-[#585656]">username</dt>
        <dd>{username}</dd>
      </div>

      <div className="flex justify-between">
        <dt className="text-[#585656]">rating</dt>
        <dd className="flex gap-2">
          {[...Array(5)].map((_, index) => (
            <Star key={Math.random()} filled={index < rating} />
          ))}
        </dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-[#585656]">games played</dt>
        <dd>{gamesPlayed}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-[#585656]">games won</dt>
        <dd>{gamesWon}</dd>
      </div>
      <div className="flex justify-between">
        <dt className="text-[#585656]">beginner time</dt>
        <BestTime time={beginnerTime} />
      </div>
      <div className="flex justify-between">
        <dt className="text-[#585656]">intermediate time</dt>
        <BestTime time={intermediateTime} />
      </div>
      <div className="flex justify-between">
        <dt className="text-[#585656]">expert time</dt>
        <BestTime time={expertTime} />
      </div>
    </dl>
  )
}
