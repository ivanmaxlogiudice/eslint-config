import { ensurePackages, interopDefault } from '../utils'
import type { TypedFlatConfigItem } from '../types'

export async function regexp(): Promise<TypedFlatConfigItem[]> {
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
            },
        },
    ]
}
