import { Link, Path } from 'react-router-dom'

interface MenuButtonProps {
  to: string | Partial<Path>
  label?: string
  text: string
}

export default function MenuButton({ to, label, text }: MenuButtonProps) {
  return (
    <Link
      to={to}
      className="bg-black text-white w-[256px] max-w-xs my-3 sm:my-4 text-lg text-center select-none hover:opacity-80 active:opacity-50 transition-opacity duration-200"
      aria-label={label}>
      {text}
    </Link>
  )
}
