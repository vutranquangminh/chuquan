import path from 'path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    setupFiles: ['./app/__tests__/setup.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
  // Prevent Vite from starting file watchers during `vitest run`,
  // which can keep the process alive on macOS via `fsevents`.
  server: {
    watch: null,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app'),
      '~': path.resolve(__dirname, './app'),
    },
  },
});
