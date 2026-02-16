import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cssInjectedByJs from 'vite-plugin-css-injected-by-js'
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

  if (mode === 'standalone') {
    return {
      plugins: [react(), cssInjectedByJs()],
      build: {
        lib: {
          entry: resolve(__dirname, 'src/standalone.ts'),
          formats: ['iife'],
          name: 'EReditorBundle',
          fileName: () => 'ereditor.standalone.js',
        },
        outDir: 'dist/standalone',
        rollupOptions: {
          output: {
            inlineDynamicImports: true,
          },
        },
      },
    }
  }

  return {
    plugins: [react()],
  }
})
