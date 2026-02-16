import { useState } from 'react'
import { useLabels } from '../../i18n/LabelsContext'

interface VideoDialogProps {
  onSubmit: (url: string) => void
  onClose: () => void
}

export default function VideoDialog({ onSubmit, onClose }: VideoDialogProps) {
  const [url, setUrl] = useState('')
  const labels = useLabels()

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <h3>{labels.insertVideo}</h3>
        <input
          type="url"
          placeholder={labels.videoUrlPlaceholder}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && url) onSubmit(url)
            if (e.key === 'Escape') onClose()
          }}
          autoFocus
        />
        <div className="dialog-actions">
          <button className="dialog-btn" onClick={onClose}>{labels.cancel}</button>
          <button className="dialog-btn primary" onClick={() => url && onSubmit(url)} disabled={!url}>
            {labels.insert}
          </button>
        </div>
      </div>
    </div>
  )
}
