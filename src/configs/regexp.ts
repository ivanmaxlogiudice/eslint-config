import { ensurePackages, interopDefault } from '../utils'
import type { OptionsOverrides, TypedFlatConfigItem } from '../types'

export async function regexp(options: OptionsOverrides = {}): Promise<TypedFlatConfigItem[]> {
    const {
        overrides = {},
    } = options

    await ensurePackages(['eslint-plugin-regexp'])
    const plugin = await interopDefault(import('eslint-plugin-regexp'))

    return [
        {
            name: 'ivanmaxlogiudice/regexp/rules',
            plugins: {
                regexp: plugin,
            },
            rules: {
                ...plugin.configs['flat/recommended'].rules,

                ...overrides,
            },
        },
    ]
}
