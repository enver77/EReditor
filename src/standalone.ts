import React from 'react'
import ReactDOM from 'react-dom/client'
import EReditorComponent from './components/Editor/Editor'
import type { EReditorProps } from './components/Editor/Editor'
import type { EReditorLabels } from './i18n/labels'
import type { Editor as TiptapEditor } from '@tiptap/react'

// Import all CSS
import './index.css'
import './components/Editor/Editor.css'
import './components/Editor/Toolbar.css'
import './components/Editor/BubbleToolbar.css'
import './components/Editor/MenuButton.css'
import './components/Editor/StatusBar.css'

interface StandaloneOptions {
  content?: string
  onChange?: (html: string) => void
  onChangeJSON?: (json: unknown) => void
  onReady?: (editor: TiptapEditor) => void
  placeholder?: string
  editable?: boolean
  showToolbar?: boolean
  showBubbleMenu?: boolean
  showExportPanel?: boolean
  showWordCount?: boolean
  showFullscreenToggle?: boolean
  enableImageUpload?: boolean
  labels?: Partial<EReditorLabels>
  colors?: string[]
}

interface StandaloneInstance {
  destroy: () => void
  getHTML: () => string
  getJSON: () => Record<string, unknown>
  setContent: (content: string) => void
  setEditable: (editable: boolean) => void
}

function create(selector: string, options: StandaloneOptions = {}): StandaloneInstance {
  const container = document.querySelector(selector)
  if (!container) {
    throw new Error(`EReditor: element not found for selector "${selector}"`)
  }

  let editorInstance: TiptapEditor | null = null
  const root = ReactDOM.createRoot(container)

  const props: EReditorProps = {
    content: options.content,
    onChange: options.onChange,
    onChangeJSON: options.onChangeJSON,
    onReady: (editor) => {
      editorInstance = editor
      options.onReady?.(editor)
    },
    placeholder: options.placeholder,
    editable: options.editable,
    showToolbar: options.showToolbar,
    showBubbleMenu: options.showBubbleMenu,
    showExportPanel: options.showExportPanel,
    showWordCount: options.showWordCount,
    showFullscreenToggle: options.showFullscreenToggle,
    enableImageUpload: options.enableImageUpload,
    labels: options.labels,
    colors: options.colors,
  }

  root.render(React.createElement(EReditorComponent, props))

  return {
    destroy() {
      root.unmount()
      editorInstance = null
    },
    getHTML() {
      return editorInstance?.getHTML() ?? ''
    },
    getJSON() {
      return editorInstance?.getJSON() ?? {}
    },
    setContent(content: string) {
      editorInstance?.commands.setContent(content)
    },
    setEditable(editable: boolean) {
      editorInstance?.setEditable(editable)
    },
  }
}

// Expose on window
;(window as unknown as Record<string, unknown>).EReditor = { create }
