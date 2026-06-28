import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/momentcraft-mvp/',
  build: {
    outDir: 'dist'
  }
});
