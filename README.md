# EReditor

A rich text editor component built with React, TypeScript, and Tiptap.

## Installation

```bash
npm install ereditor
```

## Quick Start

```tsx
import { EReditor } from 'ereditor'
import 'ereditor/style.css'

function MyEditor() {
  return (
    <EReditor
      content="<p>Hello world</p>"
      onChange={(html) => console.log(html)}
    />
  )
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | Welcome message | Initial HTML content |
| `contentJSON` | `JSONContent` | — | Initial JSON content (takes priority over `content`) |
| `onChange` | `(html: string) => void` | — | Called with HTML on every change |
| `onChangeJSON` | `(json: JSONContent) => void` | — | Called with JSON on every change |
| `onReady` | `(editor: Editor) => void` | — | Called when the editor instance is ready |
| `placeholder` | `string` | — | Placeholder text |
| `editable` | `boolean` | `true` | Whether the editor is editable |
| `className` | `string` | — | Extra CSS class on the wrapper |
| `showToolbar` | `boolean` | `true` | Show the toolbar |
| `showBubbleMenu` | `boolean` | `true` | Show the bubble menu on text selection |
| `showExportPanel` | `boolean` | `true` | Show the export panel in toolbar |
| `autofocus` | `boolean` | `false` | Focus the editor on mount |
| `extensions` | `Extensions` | Built-in set | Override the default Tiptap extensions |

## Theming

EReditor uses CSS custom properties scoped to `.editor-wrapper`. Override them to customize the look:

```css
.editor-wrapper {
  --color-primary: #e11d48;
  --color-primary-light: rgba(225, 29, 72, 0.2);
  --color-bg: #1a1a2e;
  --color-surface: #16213e;
  --color-text: #e2e8f0;
  --color-text-muted: #94a3b8;
  --color-border: #334155;
  --color-hover: #1e293b;
  --color-active: #312e81;
  --color-code-bg: #0f172a;
}
```

## Advanced Usage

### Custom Extensions

```tsx
import { EReditor, defaultExtensions } from 'ereditor'
import 'ereditor/style.css'

<EReditor extensions={[...defaultExtensions, MyCustomExtension]} />
```

### Raw Editor Access

```tsx
<EReditor
  onReady={(editor) => {
    // Full Tiptap editor instance
    editor.commands.setContent('<p>Set programmatically</p>')
  }}
/>
```

### JSON Output

```tsx
<EReditor
  onChangeJSON={(json) => {
    // Tiptap JSONContent structure
    saveToDatabase(json)
  }}
/>
```

### Read-Only Mode

```tsx
<EReditor content={savedHtml} editable={false} showToolbar={false} />
```

## Exports

```typescript
import { EReditor, defaultExtensions, getHTML, getJSON } from 'ereditor'
import type { EReditorProps } from 'ereditor'
```

## License

MIT
