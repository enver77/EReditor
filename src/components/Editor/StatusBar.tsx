import type { Editor } from '@tiptap/react'
import { useLabels } from '../../i18n/LabelsContext'
import './StatusBar.css'

interface StatusBarProps {
  editor: Editor
}

export default function StatusBar({ editor }: StatusBarProps) {
  const labels = useLabels()
  const text = editor.state.doc.textContent
  const characters = text.length
  const words = text.trim() ? text.trim().split(/\s+/).length : 0

  return (
    <div className="status-bar">
      <span>{words} {labels.words}</span>
      <span className="status-bar-divider">|</span>
      <span>{characters} {labels.characters}</span>
    </div>
  )
}
