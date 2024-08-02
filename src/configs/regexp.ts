import type { Linter } from 'eslint'
import { ensurePackages, interopDefault } from '../utils'

export async function regexp(): Promise<Linter.Config[]> {
    await ensurePackages(['eslint-plugin-regexp'])
    const plugin = await interopDefault(import('eslint-plugin-regexp'))

    return [
        {
            name: 'ivanmaxlogiudice/regexp/rules',
            rules: {
                ...plugin.configs['flat/recommended'].rules,
            },
        },
    ]
}
