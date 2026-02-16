import { useState } from 'react'
import { EReditor } from './components'
import './App.css'

function App() {
  const [html, setHtml] = useState('')

  return (
    <div className="app">
      <header className="app-header">
        <h1>EReditor</h1>
        <span className="app-subtitle">Rich Text Editor</span>
      </header>
      <main className="app-main">
        <EReditor
          content="<p>Start typing here...</p>"
          onChange={setHtml}
          autofocus
          showWordCount
          showFullscreenToggle
          enableImageUpload
          labels={{
            bold: 'Kalin',
            italic: 'Italik',
          }}
        />
        <div className="html-preview">
          <h3>HTML Output</h3>
          <pre>{html}</pre>
        </div>
      </main>
    </div>
  )
}

export default App
