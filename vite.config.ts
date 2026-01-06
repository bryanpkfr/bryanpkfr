import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base path para GitHub Pages (solo en producción)
  // En desarrollo usa '/' para que funcione en localhost:3000
  // En producción (build) usa '/bryanpkfr/' para GitHub Pages
  base: process.env.NODE_ENV === 'production' ? '/bryanpkfr/' : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
