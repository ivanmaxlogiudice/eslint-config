import fs from 'node:fs/promises'
import { builtinRules } from 'eslint/use-at-your-own-risk'
import { flatConfigsToRulesDTS } from 'eslint-typegen/core'
import { combine, comments, ignores, imports, javascript, jsonc, markdown, node, regexp, sortPackageJson, sortTsconfig, stylistic, typescript, unicorn, unocss, vue, yaml } from '../src'

const configs = await combine(
    {
        plugins: {
            '': {
                rules: Object.fromEntries(builtinRules.entries()),
            },
        },
    },
    comments,
    ignores,
    imports,
    javascript,
    jsonc,
    markdown(),
    node,
    regexp(),
    sortPackageJson,
    sortTsconfig,
    stylistic,
    typescript(),
    unicorn,
    unocss(),
    vue(),
    yaml(),
)

const configNames = configs.map(i => i.name).filter(Boolean) as string[]

let dts = await flatConfigsToRulesDTS(configs, {
    includeAugmentation: false,
})

dts += `
// Names of all the configs
export type ConfigNames = ${configNames.map(i => `'${i}'`).join(' | ')}
`

await fs.writeFile('src/typegen.d.ts', dts)
