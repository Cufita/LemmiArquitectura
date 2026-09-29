import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}', 'scripts/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: [
        'src/data/**',
        'src/lib/**',
        'src/hooks/**',
        'src/components/ui/**',
        'src/components/sections/HeroSection.tsx',
        'scripts/seo-plugin.ts',
      ],
      exclude: ['**/__tests__/**', '**/*.test.*'],
    },
  },
});
