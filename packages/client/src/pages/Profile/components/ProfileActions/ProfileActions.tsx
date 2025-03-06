import { Link } from 'react-router-dom'

type ProfileActionsProps = {
  isEdit: boolean
  setSearchParams: (props: Record<string, string>) => void
  onLogOut?: () => Promise<void>
}

export default function ProfileActions({
  isEdit,
  setSearchParams,
  onLogOut,
}: ProfileActionsProps) {
  const actions = isEdit
    ? [{ text: '[back to profile]', onClick: () => setSearchParams({}) }]
    : [
        {
          text: '[change avatar]',
          onClick: () => setSearchParams({ edit: 'avatar' }),
        },
        {
          text: '[change password]',
          onClick: () => setSearchParams({ edit: 'password' }),
        },
        {
          text: '[back to game]',
          href: '/game',
        },
        { text: '[log out]', onClick: onLogOut, className: 'text-red-600' },
      ]

  return (
    <div className="mt-8 flex flex-col justify-center items-center gap-4 max-w-md mx-auto">
      {actions.map(({ text, onClick, href, className }) =>
        href ? (
          <Link
            key={text}
            to={href}
            className="text-xs sm:text-sm hover:opacity-80">
            {text}
          </Link>
        ) : (
          <button
            key={text}
            type="button"
            onClick={onClick}
            className={`w-auto inline-block bg-transparent hover:opacity-80 text-xs sm:text-sm ${
              className || ''
            }`.trim()}>
            {text}
          </button>
        )
      )}
    </div>
  )
}
