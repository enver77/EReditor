// Import all CSS (Vite extracts into dist/style.css)
import './index.css'
import './components/Editor/Editor.css'
import './components/Editor/Toolbar.css'
import './components/Editor/BubbleToolbar.css'
import './components/Editor/MenuButton.css'

// Public API
export { default as EReditor } from './components/Editor/Editor'
export type { EReditorProps } from './components/Editor/Editor'
export { extensions as defaultExtensions } from './extensions'
export { getHTML, getJSON } from './utils/export'
