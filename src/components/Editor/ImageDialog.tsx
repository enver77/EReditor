import { useState, useRef } from 'react'
import { useLabels } from '../../i18n/LabelsContext'
import { fileToBase64 } from '../../utils/imageUpload'

interface ImageDialogProps {
  onSubmit: (src: string, alt: string) => void
  onClose: () => void
  enableUpload?: boolean
}

export default function ImageDialog({ onSubmit, onClose, enableUpload = true }: ImageDialogProps) {
  const [src, setSrc] = useState('')
  const [alt, setAlt] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const labels = useLabels()

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      const base64 = await fileToBase64(file)
      setSrc(base64)
    }
  }

  return (
    <div className="dialog-overlay" onClick={onClose}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <h3>{labels.insertImage}</h3>
        <input
          type="url"
          placeholder={labels.imageUrlPlaceholder}
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
          placeholder={labels.imageAltPlaceholder}
          value={alt}
          onChange={(e) => setAlt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && src) onSubmit(src, alt)
            if (e.key === 'Escape') onClose()
          }}
        />
        {enableUpload && (
          <div className="image-upload-row">
            <label className="image-upload-label">{labels.orUploadFile}</label>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="image-upload-input"
            />
          </div>
        )}
        <div className="dialog-actions">
          <button className="dialog-btn" onClick={onClose}>{labels.cancel}</button>
          <button className="dialog-btn primary" onClick={() => src && onSubmit(src, alt)} disabled={!src}>
            {labels.insert}
          </button>
        </div>
      </div>
    </div>
  )
}
