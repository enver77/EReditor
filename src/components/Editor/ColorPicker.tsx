import { useState, useRef, useEffect } from 'react'
import './MenuButton.css'

const COLORS = [
  '#000000', '#434343', '#666666', '#999999', '#cccccc', '#ffffff',
  '#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6',
  '#c0392b', '#d35400', '#f39c12', '#27ae60', '#2980b9', '#8e44ad',
  '#1abc9c', '#16a085', '#2c3e50', '#34495e', '#7f8c8d', '#95a5a6',
]

interface ColorPickerProps {
  currentColor: string | undefined
  onColorChange: (color: string) => void
  onReset: () => void
  title: string
  icon: React.ReactNode
}

export default function ColorPicker({
  currentColor,
  onColorChange,
  onReset,
  title,
  icon,
}: ColorPickerProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <div className="color-picker-wrapper" ref={ref}>
      <button
        className={`menu-button ${currentColor ? 'is-active' : ''}`}
        onClick={() => setOpen(!open)}
        title={title}
        type="button"
      >
        <span style={{ borderBottom: `3px solid ${currentColor || 'transparent'}` }}>
          {icon}
        </span>
      </button>
      {open && (
        <div className="color-picker-dropdown">
          <button className="color-reset" onClick={() => { onReset(); setOpen(false) }}>
            Reset
          </button>
          <div className="color-grid">
            {COLORS.map((color) => (
              <button
                key={color}
                className="color-swatch"
                style={{ background: color }}
                onClick={() => { onColorChange(color); setOpen(false) }}
                title={color}
                type="button"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
