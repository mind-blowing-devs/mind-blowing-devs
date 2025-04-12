import { Link, Path } from 'react-router-dom'
import { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'yandex' | 'secondary'

interface IBaseButton {
  className?: string
  children: ReactNode
  disabled?: boolean
  variant?: ButtonVariant
  ariaLabel?: string
  type?: 'button' | 'submit' | 'reset'
  icon?: ReactNode
}

interface ILinkButton extends IBaseButton {
  isLink: true
  to: string | Partial<Path>
  onClick?: never
}

interface IActionButton extends IBaseButton {
  isLink?: false
  to?: never
  onClick?: () => void
}

type ButtonProps = ILinkButton | IActionButton

export default function Button({
  children,
  className = '',
  variant = 'primary',
  disabled = false,
  ariaLabel,
  isLink,
  to,
  onClick,
  type = 'button',
  icon,
}: ButtonProps) {
  const baseStyles =
    'text-center transition-opacity duration-200 select-none flex items-center justify-center gap-2 text-[20px] px-4 py-2'
  const variantStyles = {
    primary: 'bg-black text-white hover:opacity-80 active:opacity-50',
    yandex: 'bg-[#FFCC00] hover:bg-[#FFC000] text-black',
    secondary: 'bg-[#D9D9D9] text-black hover:opacity-80 active:opacity-50',
  }

  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${className}`
  const buttonContent = (
    <>
      {icon && icon}
      {children}
    </>
  )

  if (isLink && to) {
    return (
      <Link
        to={to}
        className={`${buttonStyles} ${
          disabled ? 'opacity-50 pointer-events-none' : ''
        }`}
        aria-label={ariaLabel}>
        {buttonContent}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonStyles}
      aria-label={ariaLabel}>
      {buttonContent}
    </button>
  )
}
