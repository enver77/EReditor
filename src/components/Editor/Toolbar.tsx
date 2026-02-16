import type { Editor } from '@tiptap/react'
import { useState } from 'react'
import { useLabels } from '../../i18n/LabelsContext'
import MenuButton from './MenuButton'
import ColorPicker from './ColorPicker'
import LinkDialog from './LinkDialog'
import ImageDialog from './ImageDialog'
import VideoDialog from './VideoDialog'
import ExportPanel from './ExportPanel'
import './Toolbar.css'

interface ToolbarProps {
  editor: Editor
  showExportPanel?: boolean
  colors?: string[]
  enableImageUpload?: boolean
  isFullscreen?: boolean
  onToggleFullscreen?: () => void
  showFullscreenToggle?: boolean
}

export default function Toolbar({
  editor,
  showExportPanel = true,
  colors,
  enableImageUpload = true,
  isFullscreen = false,
  onToggleFullscreen,
  showFullscreenToggle = false,
}: ToolbarProps) {
  const [showLink, setShowLink] = useState(false)
  const [showImage, setShowImage] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const labels = useLabels()

  return (
    <div className="toolbar">
      {/* Undo / Redo */}
      <div className="toolbar-group">
        <MenuButton onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title={labels.undo}>
          ↩
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title={labels.redo}>
          ↪
        </MenuButton>
      </div>

      <div className="toolbar-divider" />

      {/* Text style */}
      <div className="toolbar-group">
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
        <MenuButton onClick={() => editor.chain().focus().toggleCode().run()} isActive={editor.isActive('code')} title={labels.inlineCode}>
          {'<>'}
        </MenuButton>
      </div>

      <div className="toolbar-divider" />

      {/* Headings */}
      <div className="toolbar-group">
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} title={labels.heading1}>
          H1
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} title={labels.heading2}>
          H2
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} title={labels.heading3}>
          H3
        </MenuButton>
      </div>

      <div className="toolbar-divider" />

      {/* Lists */}
      <div className="toolbar-group">
        <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} title={labels.bulletList}>
          •≡
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} title={labels.orderedList}>
          1.
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleTaskList().run()} isActive={editor.isActive('taskList')} title={labels.taskList}>
          ☑
        </MenuButton>
      </div>

      <div className="toolbar-divider" />

      {/* Block */}
      <div className="toolbar-group">
        <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} title={labels.blockquote}>
          ❝
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')} title={labels.codeBlock}>
          {'{ }'}
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().setHorizontalRule().run()} title={labels.horizontalRule}>
          ─
        </MenuButton>
      </div>

      <div className="toolbar-divider" />

      {/* Alignment */}
      <div className="toolbar-group">
        <MenuButton onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} title={labels.alignLeft}>
          ≡←
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} title={labels.alignCenter}>
          ≡↔
        </MenuButton>
        <MenuButton onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} title={labels.alignRight}>
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
          title={labels.textColor}
          icon={<span>A</span>}
          colors={colors}
        />
        <ColorPicker
          currentColor={editor.getAttributes('highlight').color}
          onColorChange={(color) => editor.chain().focus().toggleHighlight({ color }).run()}
          onReset={() => editor.chain().focus().unsetHighlight().run()}
          title={labels.highlight}
          icon={<span style={{ background: '#ff0', padding: '0 2px' }}>A</span>}
          colors={colors}
        />
      </div>

      <div className="toolbar-divider" />

      {/* Link, Image & Video */}
      <div className="toolbar-group">
        <MenuButton
          onClick={() => setShowLink(true)}
          isActive={editor.isActive('link')}
          title={labels.link}
        >
          🔗
        </MenuButton>
        <MenuButton onClick={() => setShowImage(true)} title={labels.image}>
          🖼
        </MenuButton>
        <MenuButton onClick={() => setShowVideo(true)} title={labels.video}>
          ▶
        </MenuButton>
      </div>

      <div className="toolbar-divider" />

      {/* Table */}
      <div className="toolbar-group">
        <MenuButton
          onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}
          title={labels.insertTable}
        >
          ⊞
        </MenuButton>
        {editor.isActive('table') && (
          <>
            <MenuButton onClick={() => editor.chain().focus().addColumnAfter().run()} title={labels.addColumn}>
              +|
            </MenuButton>
            <MenuButton onClick={() => editor.chain().focus().deleteColumn().run()} title={labels.deleteColumn}>
              -|
            </MenuButton>
            <MenuButton onClick={() => editor.chain().focus().addRowAfter().run()} title={labels.addRow}>
              +―
            </MenuButton>
            <MenuButton onClick={() => editor.chain().focus().deleteRow().run()} title={labels.deleteRow}>
              -―
            </MenuButton>
            <MenuButton onClick={() => editor.chain().focus().deleteTable().run()} title={labels.deleteTable}>
              ✕
            </MenuButton>
          </>
        )}
      </div>

      <div className="toolbar-divider" />

      {/* Export & Fullscreen */}
      <div className="toolbar-group">
        {showExportPanel && <ExportPanel editor={editor} />}
        {showFullscreenToggle && onToggleFullscreen && (
          <MenuButton
            onClick={onToggleFullscreen}
            isActive={isFullscreen}
            title={isFullscreen ? labels.exitFullscreen : labels.fullscreen}
          >
            {isFullscreen ? '⊠' : '⊡'}
          </MenuButton>
        )}
      </div>

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
          enableUpload={enableImageUpload}
        />
      )}

      {showVideo && (
        <VideoDialog
          onSubmit={(url) => {
            editor.chain().focus().setYoutubeVideo({ src: url }).run()
            setShowVideo(false)
          }}
          onClose={() => setShowVideo(false)}
        />
      )}
    </div>
  )
}
