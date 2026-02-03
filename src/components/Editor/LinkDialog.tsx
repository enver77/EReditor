import { useState } from 'react'

interface LinkDialogProps {
  initialUrl: string
  onSubmit: (url: string) => void
  onRemove: () => void
  onClose: () => void
}

export default function LinkDialog({ initialUrl, onSubmit, onRemove, onClose }: LinkDialogProps) {
  const [url, setUrl] = useState(initialUrl)

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <h3>Insert Link</h3>
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && url) onSubmit(url)
            if (e.key === 'Escape') onClose()
          }}
          autoFocus
        />
        <div className="dialog-actions">
          {initialUrl && (
            <button className="dialog-btn danger" onClick={onRemove}>Remove</button>
          )}
          <button className="dialog-btn" onClick={onClose}>Cancel</button>
          <button className="dialog-btn primary" onClick={() => url && onSubmit(url)} disabled={!url}>
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}
