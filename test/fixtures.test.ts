import fs from 'node:fs'
import fsp from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { afterAll, beforeAll, it } from 'vitest'
import { spawnAsync } from '../src'
import { copy } from './utils'
import type { OptionsConfig, TypedFlatConfigItem } from '../src/types'

beforeAll(async () => await fsp.rm('_fixtures', { recursive: true, force: true }))
afterAll(async () => await fsp.rm('_fixtures', { recursive: true, force: true }))

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
    it.concurrent(name, async ({ expect }) => {
        const from = resolve('fixtures/input')
        const output = resolve('fixtures/output', name)
        const target = resolve('_fixtures', name)

        // Copy input files and create eslint config.
        await copy(from, target)

        await fsp.writeFile(join(target, 'eslint.config.js'), `// @eslint-disable
import { config } from '@ivanmaxlogiudice/eslint-config'

export default config(
    ${JSON.stringify(options)},
    ...${JSON.stringify(configs) ?? []},
)`)

        // Run ESLint
        await spawnAsync('bun', ['x', 'eslint', '.', '--fix'], {
            cwd: target,
        })

        // Check files
        const files = await fsp.readdir(target)
        await Promise.all(files.map(async (file) => {
            if (file === 'eslint.config.js')
                return

            const content = await fsp.readFile(join(target, file), 'utf-8')
            const source = await fsp.readFile(join(from, file), 'utf-8')
            const outputPath = join(output, file)

            if (content === source) {
                if (fs.existsSync(outputPath)) {
                    await fsp.unlink(outputPath)
                }

                return
            }

            // Bun test suite does not have "toMatchFileSnapshot" for now.
            await expect.soft(content).toMatchFileSnapshot(outputPath)
        }))
    }, { timeout: 30_000 })
}
