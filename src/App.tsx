import { Editor } from './components'
import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>EReditor</h1>
        <span className="app-subtitle">Rich Text Editor</span>
      </header>
      <main className="app-main">
        <Editor />
      </main>
    </div>
  )
}

export default App
