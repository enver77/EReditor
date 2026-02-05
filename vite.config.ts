import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === 'lib') {
    return {
      plugins: [react()],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/lib.ts'),
          formats: ['es'],
          fileName: 'ereditor',
        },
        rollupOptions: {
          external: [
            'react',
            'react-dom',
            'react/jsx-runtime',
            /^@tiptap\//,
            'lowlight',
          ],
        },
        cssFileName: 'ereditor',
      },
    }
  }

  return {
    plugins: [react()],
  }
})
