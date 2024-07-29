import { join, resolve } from 'node:path'
import { execa } from 'execa'
import fg from 'fast-glob'
import fs from 'fs-extra'
import { afterAll, beforeAll, it } from 'vitest'
import type { OptionsConfig, TypedFlatConfigItem } from '@antfu/eslint-config'

beforeAll(async () => {
    await fs.rm('_fixtures', { force: true, recursive: true })
})
afterAll(async () => {
    await fs.rm('_fixtures', { force: true, recursive: true })
})

runWithConfig('js', {
    typescript: false,
    vue: false,
})
runWithConfig('all', {
    typescript: true,
    vue: true,
})
runWithConfig('no-style', {
    stylistic: false,
    typescript: true,
    vue: true,
})
runWithConfig('tab-double-quotes', {
    stylistic: {
        indent: 'tab',
        quotes: 'double',
    },
    typescript: true,
    vue: true,
}, {
    rules: {
        'style/no-mixed-spaces-and-tabs': 'off',
    },
})
runWithConfig('ts-override', {
    typescript: true,
}, {
    rules: {
        'ts/consistent-type-definitions': ['error', 'type'],
    },
})
runWithConfig('with-formatters', {
    vue: true,
    typescript: true,
    formatters: true,
})
runWithConfig('no-markdown-with-formatters', {
    jsx: false,
    vue: false,
    markdown: false,
    formatters: {
        markdown: true,
    },
})

function runWithConfig(name: string, configs: OptionsConfig, ...items: TypedFlatConfigItem[]) {
    it.concurrent(name, async ({ expect }) => {
        const from = resolve('fixtures/input')
        const output = resolve('fixtures/output', name)
        const target = resolve('_fixtures', name)

        await fs.copy(from, target, {
            filter: src => !src.includes('node_modules'),
        })

        await fs.writeFile(join(target, 'eslint.config.js'), `
// @eslint-disable
// eslint-disable-next-line antfu/no-import-dist
import config from '../../dist/index.js'

export default config(
  ${JSON.stringify(configs)},
  ...${JSON.stringify(items) ?? []},
)
  `)

        await execa('npx', ['eslint', '.', '--fix'], {
            cwd: target,
            stdio: 'pipe',
        })

        const files = await fg('**/*', {
            cwd: target,
            ignore: [
                'node_modules',
                'eslint.config.js',
            ],
        })

        await Promise.all(files.map(async (file) => {
            const content = await fs.readFile(join(target, file), 'utf-8')
            const source = await fs.readFile(join(from, file), 'utf-8')
            const outputPath = join(output, file)

            if (content === source) {
                if (fs.existsSync(outputPath))
                    await fs.remove(outputPath)
                return
            }

            await expect.soft(content).toMatchFileSnapshot(outputPath)
        }))
    }, 35_000)
}
