import type { Linter } from 'eslint'
import { interopDefault } from '../utils'

export async function regexp(): Promise<Linter.Config[]> {
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
