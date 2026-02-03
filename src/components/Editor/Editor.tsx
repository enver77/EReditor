import { useEditor, EditorContent } from '@tiptap/react'
import { extensions } from '../../extensions'
import Toolbar from './Toolbar'
import BubbleToolbar from './BubbleToolbar'
import './Editor.css'

const initialContent = `
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

export default function Editor() {
  const editor = useEditor({
    extensions,
    content: initialContent,
  })

  if (!editor) return null

  return (
    <div className="editor-wrapper">
      <Toolbar editor={editor} />
      <BubbleToolbar editor={editor} />
      <EditorContent editor={editor} className="editor-content" />
    </div>
  )
}
