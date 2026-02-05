import { useEditor, EditorContent } from '@tiptap/react'
import { useEffect } from 'react'
import type { Editor as TiptapEditor, Extensions, JSONContent } from '@tiptap/react'
import { extensions as defaultExtensions } from '../../extensions'
import Toolbar from './Toolbar'
import BubbleToolbar from './BubbleToolbar'
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
}: EReditorProps) {
  const editor = useEditor({
    extensions: extensions ?? defaultExtensions,
    content: contentJSON ?? content ?? defaultContent,
    editable,
    autofocus,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
      onChangeJSON?.(editor.getJSON())
    },
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

  if (!editor) return null

  return (
    <div className={`editor-wrapper${className ? ` ${className}` : ''}`}>
      {showToolbar && <Toolbar editor={editor} showExportPanel={showExportPanel} />}
      {showBubbleMenu && <BubbleToolbar editor={editor} />}
      <EditorContent editor={editor} className="editor-content" />
    </div>
  )
}
