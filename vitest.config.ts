import path from 'node:path'
import { mergeConfig, defaultExclude } from 'vitest/config'
import config from './vite.config'
import { defineConfig } from 'vitest/config'

export default mergeConfig(
  config,
  defineConfig({
    resolve: {
      alias: {
        test: path.resolve(__dirname, './test'),
      },
    },
    test: {
      globals: true,
      setupFiles: path.resolve(__dirname, './test/setup.ts'),
      exclude: [...defaultExclude],
      environmentMatchGlobs: [
        ['**/*.test.tsx', 'jsdom'],
        ['**/*.component.test.tsx', 'jsdom'],
      ],
    },
  }),
)
