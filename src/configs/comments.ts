import type { TypedFlatConfigItem } from '../types'
import { interopDefault } from '../utils'

export async function comments(): Promise<TypedFlatConfigItem[]> {
    // @ts-expect-error Missing types
    const pluginComments = await interopDefault(import('eslint-plugin-eslint-comments'))

    return [
        {
            name: 'config:eslint-comments',
            plugins: {
                'eslint-comments': pluginComments,
            },
            rules: {
                ...pluginComments.configs.recommended.rules,

                'eslint-comments/disable-enable-pair': ['error', {
                    allowWholeFile: true,
                }],
            },
        },
    ]
}
