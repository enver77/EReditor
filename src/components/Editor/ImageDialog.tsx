import { useState } from 'react'

interface ImageDialogProps {
  onSubmit: (src: string, alt: string) => void
  onClose: () => void
}

export default function ImageDialog({ onSubmit, onClose }: ImageDialogProps) {
  const [src, setSrc] = useState('')
  const [alt, setAlt] = useState('')

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <h3>Insert Image</h3>
        <input
          type="url"
          placeholder="Image URL"
          value={src}
          onChange={(e) => setSrc(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && src) onSubmit(src, alt)
            if (e.key === 'Escape') onClose()
          }}
          autoFocus
        />
        <input
          type="text"
          placeholder="Alt text (optional)"
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && src) onSubmit(src, alt)
            if (e.key === 'Escape') onClose()
          }}
        />
        <div className="dialog-actions">
          <button className="dialog-btn" onClick={onClose}>Cancel</button>
          <button className="dialog-btn primary" onClick={() => src && onSubmit(src, alt)} disabled={!src}>
            Insert
          </button>
        </div>
      </div>
    </div>
  )
}
