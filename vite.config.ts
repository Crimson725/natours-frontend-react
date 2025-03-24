import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-components': [
            './src/components/ui/LayoutUI/Header.tsx',
            './src/components/ui/LayoutUI/Footer.tsx',
          ],
          'tours': [
            './src/components/ui/Tours/AllTours.tsx',
            './src/components/ui/Tours/SingleTour.tsx',
            './src/components/ui/Tours/BookedTours.tsx',
          ],
          'auth': [
            './src/components/auth/LoginForm.tsx',
            './src/components/auth/SignupForm.tsx',
          ],
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
})
