# EReditor

A universal rich text editor built with React 19, TypeScript, Tiptap v3, and Vite.

## Features

- **Text formatting**: Bold, italic, underline, strikethrough, inline code
- **Headings**: H1, H2, H3
- **Lists**: Bullet, ordered, and task lists
- **Code blocks**: Syntax highlighting via lowlight
- **Block elements**: Blockquotes, horizontal rules
- **Text alignment**: Left, center, right
- **Colors**: Text color and highlight color with color picker
- **Links**: Insert and edit hyperlinks
- **Images**: Insert images by URL
- **Tables**: Insert, add/remove rows and columns
- **Bubble menu**: Floating toolbar on text selection
- **Export**: Copy content as HTML or JSON
- **Undo/Redo**: Full history support

## Run Standalone

```bash
npm install
npm run dev
```

## Add EReditor to Your App

### 1. Install dependencies

Add these to your project's `package.json` and run `npm install`:

```bash
npm install @tiptap/react @tiptap/pm @tiptap/starter-kit \
  @tiptap/extension-underline @tiptap/extension-text-align \
  @tiptap/extension-color @tiptap/extension-text-style \
  @tiptap/extension-highlight @tiptap/extension-link \
  @tiptap/extension-image @tiptap/extension-table \
  @tiptap/extension-table-row @tiptap/extension-table-cell \
  @tiptap/extension-table-header @tiptap/extension-task-list \
  @tiptap/extension-task-item @tiptap/extension-code-block-lowlight \
  lowlight
```

### 2. Copy the editor files

Copy these two directories into your project's `src/` folder:

```
src/
├── components/Editor/       ← all 12 files (tsx + css)
│   ├── Editor.tsx
│   ├── Editor.css
│   ├── Toolbar.tsx
│   ├── Toolbar.css
│   ├── BubbleToolbar.tsx
│   ├── BubbleToolbar.css
│   ├── MenuButton.tsx
│   ├── MenuButton.css
│   ├── ColorPicker.tsx
│   ├── ImageDialog.tsx
│   ├── LinkDialog.tsx
│   └── ExportPanel.tsx
├── extensions/
│   └── index.ts             ← Tiptap extensions config
└── utils/
    └── export.ts            ← HTML/JSON export helpers
```

### 3. Add the CSS variables

EReditor uses CSS custom properties for theming. Add these to your app's global CSS (e.g., `index.css` or `globals.css`):

```css
:root {
  --color-primary: #4f46e5;
  --color-primary-light: rgba(79, 70, 229, 0.2);
  --color-bg: #f8f9fa;
  --color-surface: #ffffff;
  --color-text: #1a1a2e;
  --color-text-muted: #6b7280;
  --color-border: #e5e7eb;
  --color-hover: #f3f4f6;
  --color-active: #eef2ff;
  --color-code-bg: #f1f3f5;
}
```

You also need the syntax highlighting classes for code blocks. Copy the `.hljs-*` styles from `src/index.css` into your global CSS, or import a highlight.js theme.

### 4. Render the editor

```tsx
import Editor from './components/Editor/Editor'

function MyPage() {
  return (
    <div>
      <h1>My App</h1>
      <Editor />
    </div>
  )
}
```

### 5. Pass initial content and get content back

The default `Editor.tsx` has hardcoded demo content. To make it accept dynamic content and report changes, update `Editor.tsx`:

```tsx
import { useEditor, EditorContent } from '@tiptap/react'
import { extensions } from '../../extensions'
import Toolbar from './Toolbar'
import BubbleToolbar from './BubbleToolbar'
import './Editor.css'

interface EditorProps {
  content?: string            // initial HTML content
  onChange?: (html: string) => void
}

export default function Editor({ content = '', onChange }: EditorProps) {
  const editor = useEditor({
    extensions,
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
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
```

Then use it in your app:

```tsx
import { useState } from 'react'
import Editor from './components/Editor/Editor'

function MyPage() {
  const [html, setHtml] = useState('<p>Hello world</p>')

  const handleSave = () => {
    // send `html` to your API, save to database, etc.
    console.log(html)
  }

  return (
    <div>
      <Editor content={html} onChange={setHtml} />
      <button onClick={handleSave}>Save</button>
    </div>
  )
}
```

### 6. Get JSON output instead of HTML

If you prefer the structured JSON format (useful for rendering content with custom components later):

```tsx
import { useState } from 'react'
import type { JSONContent } from '@tiptap/react'
import Editor from './components/Editor/Editor'

// Modify Editor.tsx to expose JSON:
// onUpdate: ({ editor }) => {
//   onChangeJSON?.(editor.getJSON())
// }

function MyPage() {
  const [doc, setDoc] = useState<JSONContent | null>(null)

  return <Editor content="" onChangeJSON={setDoc} />
}
```

### 7. Display saved content (read-only)

To render previously saved HTML content without the editor:

```tsx
function ReadOnlyView({ html }: { html: string }) {
  return (
    <div
      className="editor-content tiptap"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
```

Import `Editor.css` and the CSS variables so the content looks the same as in the editor.

### 8. Customize the theme

Override the CSS variables to match your app's design:

```css
:root {
  --color-primary: #2563eb;     /* your brand color */
  --color-surface: #1e1e2e;     /* dark mode surface */
  --color-text: #e0e0e0;        /* dark mode text */
  --color-bg: #121212;          /* dark mode background */
  /* ... etc */
}
```

### 9. Add or remove toolbar features

To remove features you don't need (e.g., tables or code blocks):

1. Remove the extension from `extensions/index.ts`
2. Remove the corresponding toolbar buttons from `Toolbar.tsx`
3. Uninstall the unused npm package

To add new Tiptap extensions, install them, add to `extensions/index.ts`, and add buttons to `Toolbar.tsx`.

## Build

```bash
npm run build
```

## Tech Stack

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tiptap v3](https://tiptap.dev/)
- [lowlight](https://github.com/wooorm/lowlight) (syntax highlighting)
