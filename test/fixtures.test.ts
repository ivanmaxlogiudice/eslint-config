import fs from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { afterAll, beforeAll, expect, it } from 'bun:test'
import type { OptionsConfig, TypedFlatConfigItem } from '../src/types'

const isWindows = process.platform === 'win32'
const timeout = isWindows ? 300_000 : 30_000

beforeAll(async () => await fs.rm('_fixtures', { recursive: true, force: true }))
afterAll(async () => await fs.rm('_fixtures', { recursive: true, force: true }))

runWithConfig('js', {
    vue: false,
    typescript: false,
    yaml: true,
    markdown: true,
})

runWithConfig('all', {
    vue: true,
    yaml: true,
    markdown: true,
    typescript: true,
})

runWithConfig('ts-override', {
    typescript: true,
}, {
    rules: {
        'ts/consistent-type-definitions': ['error', 'type'],
    },
})

function runWithConfig(name: string, options: OptionsConfig, ...configs: TypedFlatConfigItem[]): void {
    it.concurrent(name, async () => {
        const fromDir = resolve('fixtures/input')
        const outputDir = resolve('fixtures/output', name)
        const targetDir = resolve('_fixtures', name)

        await Promise.all([
            fs.cp(fromDir, targetDir, { recursive: true }),
            Bun.write(join(targetDir, 'eslint.config.js'), `// @eslint-disable
import { config } from '@ivanmaxlogiudice/eslint-config'

export default config(
    ${JSON.stringify(options)},
    ...${JSON.stringify(configs) ?? []},
)`),
        ])

        // Run ESLint
        await Bun.spawn(['eslint', '.', '--fix'], { cwd: targetDir }).exited

        // Check files
        const files = await fs.readdir(targetDir)
        await Promise.all(files.map(async (file) => {
            if (file === 'eslint.config.js')
                return

            const outputPath = join(outputDir, file)
            const [content, source] = await Promise.all([
                Bun.file(join(targetDir, file)).text(),
                Bun.file(join(fromDir, file)).text(),
            ])

            if (content === source) {
                await fs.rm(outputPath, { force: true })
                return
            }

            expect(content).toMatch(await Bun.file(outputPath).text())
        }))
    }, timeout)
}
