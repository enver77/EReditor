import { useState } from 'react'
import type { Editor } from '@tiptap/react'
import { getHTML, getJSON } from '../../utils/export'

interface ExportPanelProps {
  editor: Editor
}

export default function ExportPanel({ editor }: ExportPanelProps) {
  const [format, setFormat] = useState<'html' | 'json'>('html')
  const [open, setOpen] = useState(false)

  const output = format === 'html' ? getHTML(editor) : getJSON(editor)

  return (
    <div className="export-panel">
      <button className="menu-button" onClick={() => setOpen(!open)} title="Export" type="button">
        ⤓
      </button>
      {open && (
        <div className="export-dropdown">
          <div className="export-tabs">
            <button
              className={`export-tab ${format === 'html' ? 'active' : ''}`}
              onClick={() => setFormat('html')}
            >
              HTML
            </button>
            <button
              className={`export-tab ${format === 'json' ? 'active' : ''}`}
              onClick={() => setFormat('json')}
            >
              JSON
            </button>
          </div>
          <pre className="export-output">{output}</pre>
          <button
            className="dialog-btn primary"
            onClick={() => navigator.clipboard.writeText(output)}
          >
            Copy
          </button>
        </div>
      )}
    </div>
  )
}
