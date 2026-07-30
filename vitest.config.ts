import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';
import wyw from '@wyw-in-js/vite';

export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  plugins: [wyw({ include: ['**/*.{ts,tsx}'] })],
  test: {
    environment: 'jsdom',
    globals: false,
    setupFiles: ['./vitest.setup.ts'],
  },
});
