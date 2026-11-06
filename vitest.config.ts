import {defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: ['src/js/**/*.{ts,js}'],
      exclude: ['src/js/palettes/**'],
      reporter: ['text', 'html', 'lcov'],
      reportOnFailure: true,
      thresholds: {
        statements: 100,
        functions: 100,
        lines: 100,
        branches: 100
      }
    }
  }
});
