type ProfileActionsProps = {
  isEditPassword: boolean
  setSearchParams: (props: Record<string, string>) => void
  onLogOut?: () => Promise<void> | undefined
}

export default function ProfileActions({
  isEditPassword,
  setSearchParams,
  onLogOut,
}: ProfileActionsProps) {
  const actions = isEditPassword
    ? [{ text: '[back to profile]', onClick: () => setSearchParams({}) }]
    : [
        {
          text: '[edit avatar]',
          onClick: () => setSearchParams({ edit: 'avatar' }),
        },
        {
          text: '[change password]',
          onClick: () => setSearchParams({ edit: 'password' }),
        },
        { text: '[log out]', onClick: onLogOut, className: 'text-red-600' },
      ]

  return (
    <div className="mt-8 flex flex-col justify-center items-center gap-4 max-w-md mx-auto">
      {actions.map(({ text, onClick, className }, index) => (
        <button
          key={index}
          type="button"
          onClick={onClick}
          className={`w-auto inline-block bg-transparent hover:opacity-80 text-xs sm:text-sm ${
            className || ''
          }`.trim()}>
          {text}
        </button>
      ))}
    </div>
  )
}
