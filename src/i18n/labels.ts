export interface EReditorLabels {
  // Toolbar - History
  undo: string
  redo: string

  // Toolbar - Text formatting
  bold: string
  italic: string
  underline: string
  strikethrough: string
  inlineCode: string

  // Toolbar - Headings
  heading1: string
  heading2: string
  heading3: string

  // Toolbar - Lists
  bulletList: string
  orderedList: string
  taskList: string

  // Toolbar - Blocks
  blockquote: string
  codeBlock: string
  horizontalRule: string

  // Toolbar - Alignment
  alignLeft: string
  alignCenter: string
  alignRight: string

  // Toolbar - Colors
  textColor: string
  highlight: string
  resetColor: string

  // Toolbar - Media
  link: string
  image: string
  video: string

  // Toolbar - Table
  insertTable: string
  addColumn: string
  deleteColumn: string
  addRow: string
  deleteRow: string
  deleteTable: string

  // Toolbar - Export
  export: string
  copy: string

  // Toolbar - Fullscreen
  fullscreen: string
  exitFullscreen: string

  // Link dialog
  insertLink: string
  linkUrlPlaceholder: string
  removeLink: string
  apply: string
  cancel: string

  // Image dialog
  insertImage: string
  imageUrlPlaceholder: string
  imageAltPlaceholder: string
  uploadFile: string
  orUploadFile: string
  insert: string

  // Video dialog
  insertVideo: string
  videoUrlPlaceholder: string

  // Export panel
  html: string
  json: string

  // Status bar
  words: string
  characters: string

  // Bubble toolbar
  code: string
}

export const defaultLabels: EReditorLabels = {
  // Toolbar - History
  undo: 'Undo',
  redo: 'Redo',

  // Toolbar - Text formatting
  bold: 'Bold',
  italic: 'Italic',
  underline: 'Underline',
  strikethrough: 'Strikethrough',
  inlineCode: 'Inline Code',

  // Toolbar - Headings
  heading1: 'Heading 1',
  heading2: 'Heading 2',
  heading3: 'Heading 3',

  // Toolbar - Lists
  bulletList: 'Bullet List',
  orderedList: 'Ordered List',
  taskList: 'Task List',

  // Toolbar - Blocks
  blockquote: 'Blockquote',
  codeBlock: 'Code Block',
  horizontalRule: 'Horizontal Rule',

  // Toolbar - Alignment
  alignLeft: 'Align Left',
  alignCenter: 'Align Center',
  alignRight: 'Align Right',

  // Toolbar - Colors
  textColor: 'Text Color',
  highlight: 'Highlight',
  resetColor: 'Reset',

  // Toolbar - Media
  link: 'Link',
  image: 'Image',
  video: 'Video',

  // Toolbar - Table
  insertTable: 'Insert Table',
  addColumn: 'Add Column',
  deleteColumn: 'Delete Column',
  addRow: 'Add Row',
  deleteRow: 'Delete Row',
  deleteTable: 'Delete Table',

  // Toolbar - Export
  export: 'Export',
  copy: 'Copy',

  // Toolbar - Fullscreen
  fullscreen: 'Fullscreen',
  exitFullscreen: 'Exit Fullscreen',

  // Link dialog
  insertLink: 'Insert Link',
  linkUrlPlaceholder: 'https://example.com',
  removeLink: 'Remove',
  apply: 'Apply',
  cancel: 'Cancel',

  // Image dialog
  insertImage: 'Insert Image',
  imageUrlPlaceholder: 'Image URL',
  imageAltPlaceholder: 'Alt text (optional)',
  uploadFile: 'Upload File',
  orUploadFile: 'Or upload a file:',
  insert: 'Insert',

  // Video dialog
  insertVideo: 'Insert Video',
  videoUrlPlaceholder: 'YouTube or video URL',

  // Export panel
  html: 'HTML',
  json: 'JSON',

  // Status bar
  words: 'words',
  characters: 'characters',

  // Bubble toolbar
  code: 'Code',
}
