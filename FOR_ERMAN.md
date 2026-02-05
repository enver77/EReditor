# EReditor - The Full Story

## What Is This Project?

EReditor is a rich text editor - think of it as building your own mini Google Docs or Notion editor from scratch. Users can type text, make it bold, add headings, create lists, insert tables and images, change colors, and export their work as HTML or JSON. All running in the browser, no backend needed.

## The Technical Architecture

### The Big Picture

Imagine a sandwich. The bread on top is **React** (what the user sees and clicks). The filling is **Tiptap** (the editing engine that handles all the complex document manipulation). The bread on the bottom is **ProseMirror** (the low-level document model that Tiptap is built on). We never touch ProseMirror directly - Tiptap wraps it for us.

```
User clicks "Bold" button
    → React component handles the click
        → Calls editor.chain().focus().toggleBold().run()
            → Tiptap translates this into a ProseMirror transaction
                → ProseMirror updates the document model
                    → React re-renders to show the bold text
```

### The Codebase Structure

```
src/
├── extensions/index.ts    ← "What can the editor do?" (extensions config)
├── components/Editor/     ← "What does the editor look like?" (UI)
│   ├── Editor.tsx         ← The brain - wires everything together
│   ├── Toolbar.tsx        ← The big toolbar at the top
│   ├── BubbleToolbar.tsx  ← The floating toolbar when you select text
│   ├── MenuButton.tsx     ← A reusable button (used everywhere)
│   ├── ColorPicker.tsx    ← Color swatch dropdown
│   ├── LinkDialog.tsx     ← Modal for inserting links
│   ├── ImageDialog.tsx    ← Modal for inserting images
│   └── ExportPanel.tsx    ← HTML/JSON export dropdown
├── utils/export.ts        ← Helper functions for export
├── App.tsx                ← The app shell
└── index.css              ← Design tokens (CSS variables)
```

### How the Parts Connect

**Editor.tsx** is the hub. It calls `useEditor()` with our extensions config, then passes the `editor` instance down to `Toolbar` and `BubbleToolbar` as a prop. Every toolbar button calls `editor.chain().focus().someCommand().run()` - that's Tiptap's chainable command API. The "chain" part means you can stack multiple commands, "focus" brings the cursor back to the editor, and "run" executes everything.

**Extensions** are Tiptap's plugin system. Think of them like apps on a phone - each one adds a specific capability. StarterKit gives you the basics (paragraphs, bold, italic, lists). Then we add individual extensions for things StarterKit doesn't include: underline, text alignment, colors, tables, task lists, etc.

**CSS Variables** in `index.css` act as a design token system. Instead of hardcoding `#4f46e5` everywhere, we define `--color-primary` once. Every component references the variable. Want to change the whole color scheme? Change one file.

## Technologies Used and Why

| Technology | Why We Chose It |
|---|---|
| **React 19** | The UI framework. Component model makes the toolbar buttons easy to compose. |
| **TypeScript** | Catches bugs at compile time. Tiptap's API is complex - TS autocomplete is essential. |
| **Vite** | Blazing fast dev server with HMR. No webpack config wrestling. |
| **Tiptap v3** | The best rich text editor framework for React. Built on ProseMirror but much more developer-friendly. |
| **lowlight** | Syntax highlighting for code blocks without loading a massive library like Prism in the browser. Uses the same highlighter as highlight.js but works with virtual DOM. |

## Lessons Learned

### Bug #1: Tiptap v3 Breaking Changes

**What happened:** We initially wrote imports like `import TextStyle from '@tiptap/extension-text-style'` (default import). Tiptap v3 changed several packages to only expose named exports: `import { TextStyle } from '@tiptap/extension-text-style'`. Same for Table, TableRow, TableCell, TableHeader.

**The fix:** Check the actual exports of each package. In v3, some use default exports, some use named exports, some have both. Don't assume.

**Lesson:** When using a library at a major version boundary, don't copy v2 tutorials and expect them to work. Check the actual package exports. Running `node -e "console.log(Object.keys(require('package')))"` is a quick way to see what's actually exported.

### Bug #2: BubbleMenu Component Gone in v3

**What happened:** Tiptap v2 had a `BubbleMenu` React component exported from `@tiptap/react`. In v3, it's been moved to a separate extension (`@tiptap/extension-bubble-menu`) and doesn't export a ready-made React component.

**The fix:** Built a custom floating toolbar using `editor.view.coordsAtPos()` to calculate where the selection is, then positioned a `fixed` div at those coordinates. Listens to `selectionUpdate` and `transaction` events to reposition.

**Lesson:** Sometimes the library doesn't give you what you need and you build it yourself. Understanding the underlying API (`view.coordsAtPos`) gives you more control anyway. This is a pattern you'll see repeatedly in software engineering: the "convenience wrapper" disappears, and you need to understand one level deeper.

### Bug #3: The Color Picker Click-Away Problem

**What happened:** When you click a color swatch, the editor loses focus. When the editor loses focus, the selection disappears. When the selection disappears, the color command has nothing to apply to.

**The fix:** The `editor.chain().focus()` call in every command restores focus before executing. This is why every single toolbar button uses `.focus()` in its chain - it's not optional boilerplate, it's essential.

**Lesson:** Rich text editors are fundamentally about managing browser selection/focus state. Every interaction that takes focus away from the editor (clicking a button, opening a dropdown) needs to restore it.

### How Good Engineers Think About This

1. **Start with the data model, not the UI.** The extensions config (`extensions/index.ts`) defines what the editor *can do*. The UI just calls into it. If you started by building buttons first, you'd have buttons that do nothing.

2. **Composition over complexity.** `MenuButton` is a tiny component - just a styled button. But it's used 30+ times across Toolbar and BubbleToolbar. One component, one set of styles, consistent behavior everywhere.

3. **CSS Variables are architecture.** They look like a small thing, but they're actually an abstraction layer. They separate "what color?" from "where is it used?" That's the same principle as separating data from logic.

4. **Chain of responsibility in UI.** The Toolbar doesn't know how bold works. It just calls `editor.chain().focus().toggleBold().run()`. The editor doesn't know what buttons exist. Each layer does one thing. This makes it possible to swap out the toolbar entirely without touching the editor logic.

5. **Build the happy path first, handle edges second.** We got the editor rendering with basic formatting before worrying about tables, colors, or export. Each feature was additive - none required rewriting what came before.

### Best Practices Demonstrated

- **Type safety everywhere:** Every component has explicit TypeScript interfaces for its props
- **Controlled components:** Dialogs manage their own state with `useState`, submit handlers pass data up
- **Event cleanup:** `useEffect` returns cleanup functions to remove event listeners (BubbleToolbar)
- **Click-outside-to-close:** ColorPicker uses `mousedown` listener on `document` to close when clicking outside
- **Keyboard accessibility:** Dialogs respond to Enter (submit) and Escape (close)
- **CSS isolation:** Each component has its own CSS file, no global class name collisions

## Chapter 2: Turning EReditor Into an npm Package

### What Changed and Why

We started with a standalone Vite app — great for development, useless for anyone who wants to *use* EReditor in their own project. The goal: make it so someone can `npm install ereditor` and drop `<EReditor />` into their React app with two lines of code.

This is the difference between building a house and building a door that fits into any house.

### The Architecture of a Library

When you ship an npm package, you're not shipping your development environment. You're shipping a *contract*: "Here's what you get, here's what you provide." The contract looks like this:

```
What we ship (dist/):
  ereditor.js   ← The component code (ESM format)
  style.css     ← All the CSS, bundled together
  lib.d.ts      ← TypeScript type definitions

What the consumer provides (peerDependencies):
  react          ← They already have this
  react-dom      ← They already have this

What gets resolved at install time (dependencies):
  @tiptap/*      ← Tiptap extensions
  lowlight       ← Syntax highlighting
```

### The Props API: Designing for Consumers

The old `Editor` component had zero props — it was hardcoded. The new `EReditor` component exposes a clean props interface:

```typescript
interface EReditorProps {
  content?: string              // Give me HTML, I'll render it
  onChange?: (html: string) => void  // I'll tell you when things change
  editable?: boolean            // Read-only mode? Sure.
  showToolbar?: boolean         // Don't want the toolbar? Hide it.
  extensions?: Extensions       // Want custom Tiptap extensions? Override mine.
  // ... and more
}
```

**Design principle:** Every prop has a sensible default. `<EReditor />` with zero props still works perfectly. This is called "progressive disclosure" — simple things are simple, complex things are possible.

### Vite Library Mode: Two Builds from One Config

Here's something clever: `vite.config.ts` now checks the `mode` flag to decide what to build.

- `npm run dev` → Normal dev server for the demo app (unchanged)
- `npm run build:lib` → Library build using `vite build --mode lib`

In library mode, Vite:
1. Uses `src/lib.ts` as the entry point (not `index.html`)
2. Outputs a single ESM file (`dist/ereditor.js`)
3. Extracts all CSS into `dist/style.css`
4. **Externalizes** React, ReactDOM, and Tiptap packages

That last point is critical. "Externalizing" means: "don't bundle this dependency — let the consumer's bundler resolve it." If we bundled React into our library, and the consumer already has React, they'd end up with two copies. Two copies of React = broken hooks, broken context, cryptic errors. Always externalize peer dependencies.

### CSS Scoping: Don't Pollute the Consumer's World

The original `index.css` put variables on `:root` and reset `body` styles. For a standalone app, that's fine. For a library, it's hostile — you're overriding the consumer's global styles.

**Fix:** CSS variables moved from `:root` to `.editor-wrapper`. Global resets (`body`, `box-sizing`) moved to `App.css` (demo-only). The consumer's app is untouched. They can override variables by targeting `.editor-wrapper` in their own CSS.

### The `package.json` Exports Map

```json
"exports": {
  ".": { "import": "./dist/ereditor.js", "types": "./dist/lib.d.ts" },
  "./style.css": "./dist/style.css"
}
```

This is the modern way to tell bundlers: "When someone writes `import { EReditor } from 'ereditor'`, give them `dist/ereditor.js`. When they write `import 'ereditor/style.css'`, give them `dist/style.css`." Without this, bundlers guess — and they often guess wrong.

### Separate tsconfig for Declarations

`tsconfig.lib.json` exists solely to emit `.d.ts` type declaration files. It's separate from `tsconfig.app.json` because:
- The app tsconfig has `noEmit: true` (Vite handles compilation)
- The lib tsconfig needs `declaration: true` and `emitDeclarationOnly: true`
- The lib tsconfig excludes demo-only files (`main.tsx`, `App.tsx`)

You can't serve two masters with one tsconfig.

### New Lessons Learned

#### Lesson: peerDependencies vs dependencies

**Rule of thumb:** If the consumer must have it (React), make it a `peerDependency`. If it's an internal implementation detail the consumer shouldn't worry about (Tiptap extensions), make it a `dependency`. If it's only for development (ESLint, TypeScript), make it a `devDependency`.

We kept `react` and `react-dom` in both `peerDependencies` (for the consumer) and `devDependencies` (for our own dev server). This is standard practice.

#### Lesson: The `files` Field Saves Everyone

`"files": ["dist"]` in `package.json` means npm only publishes the `dist/` folder. Without it, you'd ship your source code, node_modules references, test files — everything. Always be explicit about what you ship.

#### Lesson: sideEffects and Tree Shaking

`"sideEffects": ["**/*.css"]` tells bundlers: "You can tree-shake any JavaScript import that isn't used, but CSS imports always have side effects (they add styles to the page) — don't remove them." Without this, aggressive bundlers might drop your CSS.

#### Lesson: The Entry Point Trick

`src/lib.ts` imports all CSS files at the top, then re-exports the public API. When Vite builds in library mode, it:
1. Sees the CSS imports → extracts them into `dist/style.css`
2. Sees the JS exports → bundles them into `dist/ereditor.js`

The consumer does `import 'ereditor/style.css'` separately. This is the standard pattern for React component libraries. The alternative (injecting CSS at runtime) causes flash-of-unstyled-content and makes server-side rendering harder.

### How Good Engineers Think About Library Design

1. **API surface area matters.** Every prop you add is a promise you maintain forever. Start minimal, add later. It's easy to add a prop; it's a breaking change to remove one.

2. **Defaults should be opinionated.** `<EReditor />` with no props should produce something useful. Don't make the consumer configure 10 things just to see text on screen.

3. **Don't break the consumer's world.** No global CSS resets. No window/document monkey-patching. Your component should be a good citizen in any React app.

4. **Two build targets, one codebase.** The demo app and the library share the same source. The difference is just which entry point Vite uses and which dependencies get externalized. This avoids the "works in dev, broken in prod" trap.

5. **Type definitions are documentation.** When a consumer hovers over `<EReditor>` in VS Code and sees the full props interface with types, that's better than any README. Invest in good TypeScript types.
