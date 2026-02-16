import { useEditor, EditorContent } from '@tiptap/react'
import { useMemo, useEffect, useState, useCallback } from 'react'
import type { Editor as TiptapEditor, Extensions, JSONContent } from '@tiptap/react'
import { extensions as defaultExtensions } from '../../extensions'
import { LabelsContext } from '../../i18n/LabelsContext'
import { defaultLabels, type EReditorLabels } from '../../i18n/labels'
import { fileToBase64 } from '../../utils/imageUpload'
import Toolbar from './Toolbar'
import BubbleToolbar from './BubbleToolbar'
import StatusBar from './StatusBar'
import './Editor.css'

export interface EReditorProps {
  content?: string
  contentJSON?: JSONContent
  onChange?: (html: string) => void
  onChangeJSON?: (json: JSONContent) => void
  onReady?: (editor: TiptapEditor) => void
  placeholder?: string
  editable?: boolean
  className?: string
  showToolbar?: boolean
  showBubbleMenu?: boolean
  showExportPanel?: boolean
  autofocus?: boolean
  extensions?: Extensions
  showWordCount?: boolean
  showFullscreenToggle?: boolean
  enableImageUpload?: boolean
  labels?: Partial<EReditorLabels>
  colors?: string[]
}

const defaultContent = `
<h2>Welcome to EReditor</h2>
<p>A rich text editor built with <strong>React</strong>, <strong>TypeScript</strong>, and <strong>Tiptap</strong>.</p>
<p>Try out the toolbar above or select text to see the bubble menu. Here are some things you can do:</p>
<ul>
  <li>Format text with <strong>bold</strong>, <em>italic</em>, <u>underline</u>, and <s>strikethrough</s></li>
  <li>Create headings, lists, and blockquotes</li>
  <li>Insert tables, images, and links</li>
  <li>Change text and highlight colors</li>
  <li>Export your content as HTML or JSON</li>
</ul>
<blockquote><p>Start editing to see the magic happen!</p></blockquote>
`

export default function EReditor({
  content,
  contentJSON,
  onChange,
  onChangeJSON,
  onReady,
  editable = true,
  className,
  showToolbar = true,
  showBubbleMenu = true,
  showExportPanel = true,
  autofocus = false,
  extensions,
  showWordCount = false,
  showFullscreenToggle = false,
  enableImageUpload = true,
  labels: labelOverrides,
  colors,
}: EReditorProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  const mergedLabels = useMemo<EReditorLabels>(
    () => labelOverrides ? { ...defaultLabels, ...labelOverrides } : defaultLabels,
    [labelOverrides],
  )

  const handleToggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev)
  }, [])

  const editor = useEditor({
    extensions: extensions ?? defaultExtensions,
    content: contentJSON ?? content ?? defaultContent,
    editable,
    autofocus,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
      onChangeJSON?.(editor.getJSON())
    },
    editorProps: enableImageUpload
      ? {
          handlePaste: (_view, event) => {
            const items = event.clipboardData?.items
            if (!items) return false
            for (const item of items) {
              if (item.type.startsWith('image/')) {
                event.preventDefault()
                const file = item.getAsFile()
                if (file) {
                  fileToBase64(file).then((base64) => {
                    editor?.chain().focus().setImage({ src: base64 }).run()
                  })
                }
                return true
              }
            }
            return false
          },
          handleDrop: (_view, event) => {
            const files = event.dataTransfer?.files
            if (!files?.length) return false
            for (const file of files) {
              if (file.type.startsWith('image/')) {
                event.preventDefault()
                fileToBase64(file).then((base64) => {
                  editor?.chain().focus().setImage({ src: base64 }).run()
                })
                return true
              }
            }
            return false
          },
        }
      : undefined,
  })

  useEffect(() => {
    if (editor && onReady) {
      onReady(editor)
    }
  }, [editor, onReady])

  useEffect(() => {
    if (editor) {
      editor.setEditable(editable)
    }
  }, [editor, editable])

  // Escape key to exit fullscreen
  useEffect(() => {
    if (!isFullscreen) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setIsFullscreen(false)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isFullscreen])

  if (!editor) return null

  const wrapperClass = [
    'editor-wrapper',
    isFullscreen && 'is-fullscreen',
    className,
  ].filter(Boolean).join(' ')

  return (
    <LabelsContext.Provider value={mergedLabels}>
      <div className={wrapperClass}>
        {showToolbar && (
          <Toolbar
            editor={editor}
            showExportPanel={showExportPanel}
            colors={colors}
            enableImageUpload={enableImageUpload}
            isFullscreen={isFullscreen}
            onToggleFullscreen={handleToggleFullscreen}
            showFullscreenToggle={showFullscreenToggle}
          />
        )}
        {showBubbleMenu && <BubbleToolbar editor={editor} />}
        <EditorContent editor={editor} className="editor-content" />
        {showWordCount && <StatusBar editor={editor} />}
      </div>
    </LabelsContext.Provider>
  )
}
