import type { Editor } from '@tiptap/react'

export function getHTML(editor: Editor): string {
  return editor.getHTML()
}

export function getJSON(editor: Editor): string {
  return JSON.stringify(editor.getJSON(), null, 2)
}
