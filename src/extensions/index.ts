import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table'
import { TableCell } from '@tiptap/extension-table'
import { TableHeader } from '@tiptap/extension-table'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Youtube from '@tiptap/extension-youtube'
import { common, createLowlight } from 'lowlight'

const lowlight = createLowlight(common)

export const extensions = [
  StarterKit.configure({
    codeBlock: false,
  }),
  Underline,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
  }),
  TextStyle,
  Color,
  Highlight.configure({
    multicolor: true,
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
  }),
  Image.configure({
    inline: false,
    allowBase64: true,
  }),
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableCell,
  TableHeader,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  CodeBlockLowlight.configure({
    lowlight,
  }),
  Youtube.configure({
    inline: false,
  }),
]
