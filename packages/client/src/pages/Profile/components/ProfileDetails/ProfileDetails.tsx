import Star from '../Star'

type ProfileDetailsProps = {
  username: string
  userAchievements: { gamesPlayed: number; gamesWon: number; bestTime: string }
}

function calculatePlayerRating(gamesPlayed: number, gamesWon: number): number {
  if (gamesPlayed === 0) {
    return 0
  }

  const adjustedGamesPlayed = gamesPlayed + 10
  const rating = (5 * gamesWon) / adjustedGamesPlayed

  return Math.min(5, Math.max(0, Math.ceil(rating)))
}

export default function ProfileDetails({
  username,
  userAchievements,
}: ProfileDetailsProps) {
  const { gamesPlayed, gamesWon, bestTime } = userAchievements
  const rating = calculatePlayerRating(gamesPlayed, gamesWon)
  return (
    <>
      <section className="w-full max-w-md mx-auto">
        <dl className="space-y-4">
          <div className="flex justify-between">
            <dt className="text-[#585656]">username</dt>
            <dd>{username}</dd>
          </div>

          {/* Data will receive from leaderboard API */}
          <div className="flex justify-between">
            <dt className="text-[#585656]">rating</dt>
            <dd className="flex gap-2">
              {[...Array(5)].map((_, index) => (
                <Star key={index} filled={index < rating} />
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
            <dt className="text-[#585656]">best time</dt>
            <dd className="text-[#0E7A11]">{bestTime}</dd>
          </div>
        </dl>
      </section>
    </>
  )
}
