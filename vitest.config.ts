import {configDefaults, defineConfig} from 'vitest/config';

export default defineConfig({
  test: {
    include: [...configDefaults.include, 'scripts/__tests__/**/*.tests.js'],
    exclude: [
      ...configDefaults.exclude,
      'vendor/apca-w3/**',
      'vendor/chroma.js/**',
      'vendor/color.js/**',
      'vendor/coloraide/**',
      'vendor/colorparsely/**'
    ],
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
