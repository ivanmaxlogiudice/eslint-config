import type { Linter } from 'eslint'
import { ignores, imports, javascript, jsonc, node, regexp, sortPackageJson, sortTsconfig, stylistic, typescript, unicorn } from './configs'
import type { OptionsConfig } from './types'

/** Ignore common files and include javascript support */
export const presetJavaScript = [
    ...ignores,
    ...javascript,
    ...node,
    ...imports,
    ...unicorn,
    ...stylistic,
]

export async function config(options: OptionsConfig = {}, config: Linter.Config | Linter.Config[] = []): Promise<Linter.Config[]> {
    const {
        regexp: enableRegexp = false,
    } = options
    
    const configs = [
        ...presetJavaScript,

        // Basic json(c) file support and sorting json keys
        ...jsonc,
        ...sortPackageJson,
        ...sortTsconfig,
    ]

    if (enableRegexp) {
        configs.push(...await regexp())
    }

    if (Object.keys(config).length > 0) {
        configs.push(...(Array.isArray(config) ? config : [config]))
    }

    return configs
}
