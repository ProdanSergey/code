import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        environment: 'happy-dom',
        globals: true,
        include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
        setupFiles: ['./setup.happy-dom.ts'],
    }
})