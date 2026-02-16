import { useState } from 'react'
import type { Editor } from '@tiptap/react'
import { useLabels } from '../../i18n/LabelsContext'
import { getHTML, getJSON } from '../../utils/export'

interface ExportPanelProps {
  editor: Editor
}

export default function ExportPanel({ editor }: ExportPanelProps) {
  const [format, setFormat] = useState<'html' | 'json'>('html')
  const [open, setOpen] = useState(false)
  const labels = useLabels()

  const output = format === 'html' ? getHTML(editor) : getJSON(editor)

  return (
    <div className="export-panel">
      <button className="menu-button" onClick={() => setOpen(!open)} title={labels.export} type="button">
        ⤓
      </button>
      {open && (
        <div className="export-dropdown">
          <div className="export-tabs">
            <button
              className={`export-tab ${format === 'html' ? 'active' : ''}`}
              onClick={() => setFormat('html')}
            >
              {labels.html}
            </button>
            <button
              className={`export-tab ${format === 'json' ? 'active' : ''}`}
              onClick={() => setFormat('json')}
            >
              {labels.json}
            </button>
          </div>
          <pre className="export-output">{output}</pre>
          <button
            className="dialog-btn primary"
            onClick={() => navigator.clipboard.writeText(output)}
          >
            {labels.copy}
          </button>
        </div>
      )}
    </div>
  )
}
