import type { Editor } from '@tiptap/react'
import { useState } from 'react'
import MenuButton from './MenuButton'
import ColorPicker from './ColorPicker'
import LinkDialog from './LinkDialog'
import ImageDialog from './ImageDialog'
import ExportPanel from './ExportPanel'
import './Toolbar.css'

interface ToolbarProps {
  editor: Editor
  showExportPanel?: boolean
}

export default function Toolbar({ editor, showExportPanel = true }: ToolbarProps) {
  const [showLink, setShowLink] = useState(false)
  const [showImage, setShowImage] = useState(false)

  return (
    <div className="toolbar">
      {/* Undo / Redo */}
      <div className="toolbar-group">
        <MenuButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo">
          ↩
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo">
          ↪
        </MenuButton>
      </div>

      <div className="toolbar-divider" />

      {/* Text style */}
      <div className="toolbar-group">
        <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} title="Bold">
          <b>B</b>
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} title="Italic">
          <i>I</i>
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} title="Underline">
          <u>U</u>
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleStrike().run()} isActive={editor.isActive('strike')} title="Strikethrough">
          <s>S</s>
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive('code')} title="Inline Code">
          {'<>'}
        </MenuButton>
      </div>

      <div className="toolbar-divider" />

      {/* Headings */}
      <div className="toolbar-group">
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} title="Heading 1">
          H1
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} title="Heading 2">
          H2
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} title="Heading 3">
          H3
        </MenuButton>
      </div>

      <div className="toolbar-divider" />

      {/* Lists */}
      <div className="toolbar-group">
        <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title="Bullet List">
          •≡
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title="Ordered List">
          1.
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleTaskList().run()} isActive={editor.isActive('taskList')} title="Task List">
          ☑
        </MenuButton>
      </div>

      <div className="toolbar-divider" />

      {/* Block */}
      <div className="toolbar-group">
        <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} title="Blockquote">
          ❝
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')} title="Code Block">
          {'{ }'}
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title="Horizontal Rule">
          ─
        </MenuButton>
      </div>

      <div className="toolbar-divider" />

      {/* Alignment */}
      <div className="toolbar-group">
        <MenuButton onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} title="Align Left">
          ≡←
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} title="Align Center">
          ≡↔
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} title="Align Right">
          ≡→
        </MenuButton>
      </div>

      <div className="toolbar-divider" />

      {/* Colors */}
      <div className="toolbar-group">
        <ColorPicker
          currentColor={editor.getAttributes('textStyle').color}
          onColorChange={(color) => editor.chain().focus().setColor(color).run()}
          onReset={() => editor.chain().focus().unsetColor().run()}
          title="Text Color"
          icon={<span>A</span>}
        />
        <ColorPicker
          currentColor={editor.getAttributes('highlight').color}
          onColorChange={(color) => editor.chain().focus().toggleHighlight({ color }).run()}
          onReset={() => editor.chain().focus().unsetHighlight().run()}
          title="Highlight"
          icon={<span style={{ background: '#ff0', padding: '0 2px' }}>A</span>}
        />
      </div>

      <div className="toolbar-divider" />

      {/* Link & Image */}
      <div className="toolbar-group">
        <MenuButton
          onClick={() => setShowLink(true)}
          isActive={editor.isActive('link')}
          title="Link"
        >
          🔗
        </MenuButton>
        <MenuButton onClick={() => setShowImage(true)} title="Image">
          🖼
        </MenuButton>
      </div>

      <div className="toolbar-divider" />

      {/* Table */}
      <div className="toolbar-group">
        <MenuButton
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          title="Insert Table"
        >
          ⊞
        </MenuButton>
        {editor.isActive('table') && (
          <>
            <MenuButton onClick={() => editor.chain().focus().addColumnAfter().run()} title="Add Column">
              +|
            </MenuButton>
            <MenuButton onClick={() => editor.chain().focus().deleteColumn().run()} title="Delete Column">
              -|
            </MenuButton>
            <MenuButton onClick={() => editor.chain().focus().addRowAfter().run()} title="Add Row">
              +―
            </MenuButton>
            <MenuButton onClick={() => editor.chain().focus().deleteRow().run()} title="Delete Row">
              -―
            </MenuButton>
            <MenuButton onClick={() => editor.chain().focus().deleteTable().run()} title="Delete Table">
              ✕
            </MenuButton>
          </>
        )}
      </div>

      <div className="toolbar-divider" />

      {/* Export */}
      {showExportPanel && (
        <div className="toolbar-group">
          <ExportPanel editor={editor} />
        </div>
      )}

      {showLink && (
        <LinkDialog
          initialUrl={editor.getAttributes('link').href || ''}
          onSubmit={(url) => {
            editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
            setShowLink(false)
          }}
          onRemove={() => {
            editor.chain().focus().extendMarkRange('link').unsetLink().run()
            setShowLink(false)
          }}
          onClose={() => setShowLink(false)}
        />
      )}

      {showImage && (
        <ImageDialog
          onSubmit={(src, alt) => {
            editor.chain().focus().setImage({ src, alt }).run()
            setShowImage(false)
          }}
          onClose={() => setShowImage(false)}
        />
      )}
    </div>
  )
}
