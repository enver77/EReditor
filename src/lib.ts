// Import all CSS (Vite extracts into dist/style.css)
import './index.css'
import './components/Editor/Editor.css'
import './components/Editor/Toolbar.css'
import './components/Editor/BubbleToolbar.css'
import './components/Editor/MenuButton.css'
import './components/Editor/StatusBar.css'

// Public API
export { default as EReditor } from './components/Editor/Editor'
export type { EReditorProps } from './components/Editor/Editor'
export { extensions as defaultExtensions } from './extensions'
export { getHTML, getJSON } from './utils/export'
export { defaultLabels, type EReditorLabels } from './i18n/labels'
export { DEFAULT_COLORS } from './components/Editor/ColorPicker'
