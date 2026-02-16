import { useEffect, useRef, useState, useCallback } from 'react'
import type { Editor } from '@tiptap/react'
import { useLabels } from '../../i18n/LabelsContext'
import MenuButton from './MenuButton'
import './BubbleToolbar.css'

interface BubbleToolbarProps {
  editor: Editor
}

export default function BubbleToolbar({ editor }: BubbleToolbarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null)
  const labels = useLabels()

  const updatePosition = useCallback(() => {
    const { from, to } = editor.state.selection
    if (from === to || !ref.current) {
      setCoords(null)
      return
    }

    const view = editor.view
    const start = view.coordsAtPos(from)
    const end = view.coordsAtPos(to)
    const box = ref.current.getBoundingClientRect()

    setCoords({
      left: (start.left + end.right) / 2 - box.width / 2,
      top: start.top - box.height - 8,
    })
  }, [editor])

  useEffect(() => {
    editor.on('selectionUpdate', updatePosition)
    editor.on('transaction', updatePosition)
    return () => {
      editor.off('selectionUpdate', updatePosition)
      editor.off('transaction', updatePosition)
    }
  }, [editor, updatePosition])

  if (!coords) return null

  return (
    <div
      ref={ref}
      className="bubble-toolbar"
      style={{
        position: 'fixed',
        top: coords.top,
        left: coords.left,
      }}
    >
      <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title={labels.bold}>
        <b>B</b>
      </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title={labels.italic}>
        <i>I</i>
      </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title={labels.underline}>
        <u>U</u>
      </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} title={labels.strikethrough}>
        <s>S</s>
      </MenuButton>
      <MenuButton onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive('code')} title={labels.code}>
        {'<>'}
      </MenuButton>
    </div>
  )
}
