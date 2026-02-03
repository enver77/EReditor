import './MenuButton.css'

interface MenuButtonProps {
  onClick: () => void
  isActive?: boolean
  disabled?: boolean
  title: string
  children: React.ReactNode
}

export default function MenuButton({
  onClick,
  isActive = false,
  disabled = false,
  title,
  children,
}: MenuButtonProps) {
  return (
    <button
      className={`menu-button ${isActive ? 'is-active' : ''}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
      type="button"
    >
      {children}
    </button>
  )
}
