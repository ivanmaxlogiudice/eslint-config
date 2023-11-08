import { join, resolve } from 'node:path'
import { execa } from 'execa'
import fg from 'fast-glob'
import fs from 'fs-extra'
import { afterAll, beforeAll, it } from 'vitest'
import type { ConfigItem, OptionsConfig } from '../src/types'

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
})
runWithConfig('ts-override', {
    typescript: true,
}, {
    rules: {
        'ts/consistent-type-definitions': ['error', 'type'],
    },
})

function runWithConfig(name: string, configs: OptionsConfig, ...items: ConfigItem[]) {
    it.concurrent(name, async ({ expect }) => {
        const from = resolve('fixtures/input')
        const output = resolve('fixtures/output', name)
        const target = resolve('_fixtures', name)

        await fs.copy(from, target, {
            filter: src => !src.includes('node_modules'),
        })

        await fs.writeFile(join(target, 'eslint.config.js'), `
// @eslint-disable
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
            let content = await fs.readFile(join(target, file), 'utf-8')
            const source = await fs.readFile(join(from, file), 'utf-8')

            if (content === source)
                content = '// unchanged\n'

            await expect.soft(content).toMatchFileSnapshot(join(output, file))
        }))
    }, 30_000)
}
